import React, { memo, useState } from 'react'
import './DataTable.css'
const DataTable = ({marketData}) => {

  return (
    <div className='dataTable_parentDiv'>

<div className="table-container">
      <h2 className="table-title">📊 Live Market Feed</h2>
      <table className="market-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price (₹)</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {marketData.map((item, index) => (
            <tr key={index}>
              <td>{item.symbol}</td>
              <td style={{color:item.price >= 0 ? 'green' : 'red'}}>{item.price}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <span style={{textAlign:'center',color:'red',fontSize:'28px',fontWeight:'700'}}>*Shrink the screen (800px) to see the sidebar socket getting unsubscribe in dev tools.</span>
    </div>
  )
}

export default memo(DataTable);