import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import ChartContainer from '../../components/Admin/ChartContainer';
import EmployeeCard from '../../components/Admin/EmployeeCard';
import EmployeeTasks from '../../components/Admin/EmployeeTasks';
import Popup from '../../components/Employee/Popup';

export default function EmployeeDetails() {

    const { id } = useParams();

    //const tasksData = useSelector((state) => state.tasks.tasks);

  return (
    <>
    <div className='detail-container' style={{width: '100%', margin:'1.5%'}}>

        <EmployeeCard id = {id}/>
        {/* <ChartContainer id = {id}/> */}
        <EmployeeTasks id = {id}/>
       
    </div>
    </>
  )
}
