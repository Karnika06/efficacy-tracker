import React from 'react'
import { StyledFormArea, StyledSubTitle, TextLink } from '../Styles'
import taskImage from '../../assets/NoTask.png'

export default function NoTask() {
  return (
    <div>
        <StyledFormArea style={{
            background: 'rgba(255, 255, 255, 0.18)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(4px)',
            // &::webkit-backdrop-filter: 'blur(7px)',
            border: '1px solid rgba(255, 255, 255, 0.12)'
        }}>
            <img src={taskImage} alt='Add task' style={{marginBottom: "5%"}}/>
            <StyledSubTitle size={22}>You haven't added any tasks.<br/>Add tasks to get started. 
            <TextLink to='/employee/toaddTask'>Add Task</TextLink> </StyledSubTitle>
        </StyledFormArea>
        
    </div>
  )
}
