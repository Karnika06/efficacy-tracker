import React from 'react'

export default function StatusDisplay({status}) {

  const getColor = (status) => {
    let color
    switch(status) {
      case 'Done':
        color = 'rgb(186,255,201)'
        break
      case 'Working on it':
        color = 'rgb(255,223,186)'
        break
      case 'Stuck':
        color = 'rgb(186,225,255)'
        break
      default:
        color = 'rgb(186,225,255)'
    }

    return color
  }
  return (
    <div className='status-display' style={{backgroundColor: getColor(status)}}>
      {status}
    </div>
  )
}