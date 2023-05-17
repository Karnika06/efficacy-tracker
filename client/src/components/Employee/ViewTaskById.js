import React from "react";
import { useSelector } from "react-redux";
import DueDateDisplay from "./DueDateDisplay";
import LevelDisplay from "./LevelDisplay";
import PriorityDisplay from "./PriorityDisplay";
import StartDateDisplay from "./StartDateDisplay";
import StatusDisplay from "./StatusDisplay";
import TitleDisplay from "./TitleDisplay";
import './ViewTaskById.css'
import useViewport from "../../viewport/useViewport";

export default function ViewTaskById({id}) {

    const taskData = useSelector((state) => state.tasks.tasks.filter(task => task.task_id == id))

    const { isMobile, isTablet } = useViewport();

  const task = {
    title: "Make a login form. Made it but not able to make the most important part of it for which I need some days.",
    status: "Working on it",
    priority: "4",
    level: "Medium",
    dueDate: "25-01-2023",
    startDate: "25-01-2023",
  };

  return (
    
    <div className="task-detail-container" style={{flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: 'center'}}>
       {console.log(taskData)}
      <div className="task-detail">
        <label className="view-title" > About Task</label>
        <TitleDisplay title={taskData[0].task_name} style={{padding: '10px'}}/>
      </div>
      <div className="task-detail">
        <label className="view-title" > Task Description</label>
        <TitleDisplay title={taskData[0].task_desc} style={{padding: '10px'}}/>
      </div>
      <div className="task-detail">
        <label className="view-status">Status of task</label>
        <StatusDisplay status={taskData[0].task_status} />
      </div>
      <div className="task-detail">
        <label className="view-priority">Priority of task</label>
        <PriorityDisplay priority={taskData[0].task_priority} />
      </div>
      <div className="task-detail">
        <label className="view-level">Level of task</label>
        <LevelDisplay level={taskData[0].task_level} />
      </div>
      <div className="task-detail">
        <label className="view-start">Start Date</label>
        <StartDateDisplay startDate={new Date(taskData[0].startDate).toISOString().replace('T', ' ').slice(0, -8)} />
      </div>
      <div className="task-detail">
        <label className="view-due">Due Date</label>
        <DueDateDisplay dueDate={new Date(taskData[0].dueDate).toISOString().replace('T', ' ').slice(0, -8)} />
      </div>
      <div className="task-detail">
        <label className="view-due">Task Duration</label>
        <TitleDisplay title={taskData[0].task_duration}/>
      </div>
    </div>
  );
}
