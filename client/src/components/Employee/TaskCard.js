import React, { useState } from "react";
import DueDateDisplay from "./DueDateDisplay";
import LevelDisplay from "./LevelDisplay";
import PriorityDisplay from "./PriorityDisplay";
import StartDateDisplay from "./StartDateDisplay";
import StatusDisplay from "./StatusDisplay";
import TitleDisplay from "./TitleDisplay";
import "./TaskCard.css";
import DeleteTask from "./DeleteTask";
import { colors } from "../Styles";
import Popup from "../../components/Employee/Popup";
import ViewTaskById from "./ViewTaskById";

import { MdModeEditOutline } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import EditTaskById from "./EditTaskById";

export default function TaskCard({ emp, task }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <div className="task-card">
      <div className="task-link" onClick={() => setOpenPopup(true)}>
        <div className="task-color"></div>
        <TitleDisplay title={task.task_name} />
        <StatusDisplay status={task.task_status} />
        <PriorityDisplay priority={task.task_priority} />
        <LevelDisplay level={task.task_level} />
        <StartDateDisplay startDate={new Date(task.startDate).toISOString().replace('T', ' ').slice(0, -8)} />
        <DueDateDisplay dueDate={new Date(task.dueDate).toISOString().replace('T', ' ').slice(0, -8)} />
      </div>
      <DeleteTask id={task.task_id} />
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* {edit && <MdOutlineArrowBackIosNew/>} */}

            <div>Task Details</div>
            <div style={{ cursor: "pointer" }}>
              {edit == true ? (
                <IoChevronBackCircleSharp
                  style={{ rotate: "180deg" }}
                  onClick={() => setEdit(false)}
                />
              ) : (
                <MdModeEditOutline onClick={() => setEdit(true)} />
              )}
            </div>
          </div>
        }
      >
        {edit == true ? <EditTaskById emp = {emp} id={task.task_id} openPopup setOpenPopup/> : <ViewTaskById id={task.task_id}/>}
      </Popup>
    </div>
  );
}
