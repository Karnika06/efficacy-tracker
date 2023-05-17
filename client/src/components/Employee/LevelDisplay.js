import React from 'react'

export default function LevelDisplay({level}) {

  const getColor = (level) => {
    let color
    switch(level) {
      case 'Hard':
        color = 'rgb(232, 103, 68)'
        break
      case 'Medium':
        color = 'rgb(245, 195, 46)'
        break
      case 'Easy':
        color = 'rgb(93, 221, 86)'
        break
      default:
        color = 'rgb(186,225,255)'
    }
    return color
  }

  return (
    <div className='level-display' style={{backgroundColor: getColor(level)}}>{level}</div>
  )
}
