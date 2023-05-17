import React from 'react'

export default function PriorityDisplay({priority}) {

  
  return (
    <div className='priority-display'>
      <div className='star-container' style = {{color: 'rgb(179, 179, 179)'}}>
        <h3 style = {{color: priority >= 1 ? 'rgb(255, 255, 47)' : ''}}>★</h3>
        <h3 style = {{color: priority >= 2 ? 'rgb(255, 255, 47)' : ''}}>★</h3>
        <h3 style = {{color: priority >= 3 ? 'rgb(255, 255, 47)' : ''}}>★</h3>
        <h3 style = {{color: priority >= 4 ? 'rgb(255, 255, 47)' : ''}}>★</h3>
        <h3 style = {{color: priority >= 5 ? 'rgb(255, 255, 47)' : ''}}>★</h3>
      </div>
    </div>
  )
}
