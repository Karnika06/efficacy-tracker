import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Widget.css'

export default function Widget({type}) {
  return (
    <div className='widget'>
        <div className='left'>
            <span className='title'>{type.title}</span>
            
            <Link className='widget-link' to={type.link}>See all users</Link>
        </div>
        <div className='right'>
        <span className='counter'>{type.count}</span>
        <span className='icon'>{type.icon}</span>
        </div>
    </div>
  )
}
