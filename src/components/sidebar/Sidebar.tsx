import React, { memo, useEffect, useRef, useState } from "react";
import "./Sidebar.css";
import socket from "../../Utils/socket";
const Sidebar = () => {
  const sidebarRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [price,setPrice] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("ENTRY ", entry);
        // alert("Visibility changed")

        if(entry?.isIntersecting){
          socket.emit('subscribe:sidebar');
          socket.on('sidebar', (data) => {
                console.log("📈 Sidebar price update:", data);
                setPrice(data);
              });
        }
        else{
          socket.emit('unsubscribe:sidebar');

        }
        setIsVisible(entry?.isIntersecting);

      },
      {
        root: null, //viewport
        threshold: 0.1, // 10% visible
      }
    );

    if (sidebarRef?.current) {
      observer.observe(sidebarRef.current);
    }

    return () => {
      if (sidebarRef.current) observer.unobserve(sidebarRef.current);
    };
  }, []);

  return (
    <div ref={sidebarRef} className={`sidebar_parentDiv  ${ price>=0 ? 'positive' : 'negative'}`}>
      Sidebar price <b>{price}</b>
    </div>
  );
};

export default memo(Sidebar);
