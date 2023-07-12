import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../components/Shared/Sidebar'
import { StyledContainer } from '../components/Styles'
import AdminDashboard from './AdminDashboard'
import {FaBars, FaTh, FaUserAlt} from "react-icons/fa"
import ViewAllEmployees from './Admin/ViewAllEmployees'
import EmployeeDetails from './Admin/EmployeeDetails'
import ViewFeedbacks from './Admin/ViewFeedbacks'
import { VscFeedback } from "react-icons/vsc";
import {BiLogOut } from "react-icons/bi";
import CommentIcon from '@mui/icons-material/Comment';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import EmployeeView from './Admin/EmployeeView'

export default function Admin() {

  const menuItem = [
    // {
    //   path: '/admin/about',
    //   name: 'About',
    //   icon: <FaUserAlt/>
    // },
    {
      path: '/admin',
      name: 'Dashboard',
      icon: <FaTh/>
    },
    {
      path: '/admin/viewallemployees',
      name: 'All Employees',
      icon: <PeopleAltIcon/>
    },
    {
      path: '/admin/analytics',
      name: 'Analytics',
      icon: <FaTh/>
    },
    {
      path: '/admin/feedbacks',
      name: 'Feedbacks',
      icon: <CommentIcon/>
    },

    
  ]

  return (
    <div className='main-body' >
        <Sidebar menuItem={menuItem}>
        {/* <div className='right-body' > */}
        
          
              <Routes>
                <Route path="/" element={<StyledContainer><AdminDashboard/></StyledContainer>}/>
                <Route path="/viewallemployees" element={<StyledContainer style={{justifyContent: 'center', alignItems: 'center'}}><ViewAllEmployees/></StyledContainer>}/>
                <Route path="/viewemployeedetails/:id" element={<StyledContainer><EmployeeDetails/></StyledContainer>}/>
                <Route path="/feedbacks" element={<StyledContainer style={{justifyContent: 'center', alignItems: 'center'}}><ViewFeedbacks/></StyledContainer>}/>
              </Routes>
       
        {/* </div> */}
        </Sidebar>
    </div>
  )
}
