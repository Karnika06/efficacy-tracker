import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'

import Sidebar from '../components/Shared/Sidebar'
import { StyledContainer } from '../components/Styles'
import AddTask from './Employee/AddTask'
import Feedback from './Employee/Feedback'
import PreviousTasks from './Employee/PreviousTasks'
import TodaysTasks from './Employee/TodaysTasks'
import EmployeeDashboard from './EmployeeDashboard'
import { VscFeedback } from "react-icons/vsc";
import SettingsIcon from '@mui/icons-material/Settings';
import CommentIcon from '@mui/icons-material/Comment';
import TodayIcon from '@mui/icons-material/Today';
import {FaListAlt, FaUserAlt} from "react-icons/fa"
import AddTaskIcon from '@mui/icons-material/AddTask';
import {BiLogOut} from "react-icons/bi"
import {MdSpaceDashboard} from "react-icons/md"
import About from './Employee/About'




export default function Employee() {

  const list = [
    {
      path: '/employee/dashboard',
      name: 'Dashboard',
      icon: <MdSpaceDashboard/>
    },
    {
      path: '/employee/about',
      name: 'About',
      icon: <FaUserAlt/>
    },
    {
      path: '/employee/toaddTask',
      name: 'Add Tasks',
      icon: <AddTaskIcon/>
    },
    {
      path: '/employee/todaysTasks',
      name: 'Todays Tasks',
      icon: <TodayIcon/>
    },
    {
      path: '/employee/previousTasks',
      name: 'All Tasks',
      icon: <FaListAlt/>
    },
    {
      path: '/employee/feedback',
      name: 'Feedbacks',
      icon: <CommentIcon/>
    },

    
  ]

  return (
    <div className='main-body'>
        <Sidebar menuItem={list}>
        {/* <div className='right-body' style={{height: '100vh', width: '80vw'}}> */}
        
        

              <Routes>
                <Route path="/toaddTask" element={<StyledContainer style={{justifyContent: 'center', alignItems: 'center'}}><AddTask/></StyledContainer>}/>
                <Route path="/" element={<StyledContainer><EmployeeDashboard/></StyledContainer>}/>
                <Route path="/dashboard" element={<StyledContainer><EmployeeDashboard/></StyledContainer>}/>
                <Route path="/todaysTasks" element={<StyledContainer style={{justifyContent: 'center', alignItems: 'center'}}><TodaysTasks/></StyledContainer>}/>
                <Route path="/previousTasks" element={<StyledContainer style={{justifyContent: 'center', alignItems: 'center'}}><PreviousTasks/></StyledContainer>}/>
                <Route path="/feedback" element={<StyledContainer style={{justifyContent: 'center', alignItems: 'center'}}><Feedback/></StyledContainer>}/>
                <Route path="/about" element={<StyledContainer style={{justifyContent: 'center', alignItems: 'center'}}><About/></StyledContainer>}/>
              </Routes>
        
        {/* </div> */}
        </Sidebar>
    </div>
  )
}
