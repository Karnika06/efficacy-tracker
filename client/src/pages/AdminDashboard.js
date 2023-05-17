import React, { useEffect } from 'react'
import Widget from '../components/Shared/Widget'
import {HiUsers } from "react-icons/hi";
import {VscFeedback } from "react-icons/vsc";
import { connect, useSelector } from 'react-redux';
import { getAllUsers } from '../auth/actions/userActions';
import { getAllFeedback } from '../auth/actions/feedbackActions';
import { Doughnut, Line, Pie } from "react-chartjs-2";
import {  Chart, Tooltip, Title, ArcElement, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
// import {Chart} from "chart.js";

  Chart.register(
    Tooltip, Title, ArcElement, Legend, LineElement, CategoryScale, LinearScale, PointElement
  )


function AdminDashboard({getAllUsers, getAllFeedback}) {

  const employeesData = useSelector((state) => state.employees.employees);

  const feedbackData = useSelector((state) => state.feedbacks.feedbacks)

  useEffect(() => { 
    getAllUsers()
    getAllFeedback()
           
          },[])

  const employee =
    {
      title: 'EMPLOYEES',
      count: employeesData.length,
      link: '/admin/viewallemployees',
      icon: <HiUsers/>
    }

    const feedbacks =
    {
      title: 'FEEDBACKS',
      count: feedbackData.length,
      link: '/admin/feedbacks',
      icon: <VscFeedback/>
    }

    const data = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };

  return (
    <>
    
    <div style={{width: '100%'}}>
      <div className='widgets' style={{display: 'flex', padding: '20px', gap: '20px'}}>
        <Widget type = {employee}/>
        <Widget type = {feedbacks}/>
      </div>
      <div className = 'performance-chart'>
          Performance Chart
      </div>
      <div className = 'doughnut-chart' style={{ width: '50%' , height: '50%'}}>
      <Doughnut  data={data}/>
      </div>
    </div>
    </>
  )
}

export default connect(null, {getAllUsers, getAllFeedback})(AdminDashboard);