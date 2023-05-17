import React, { useState } from 'react'
import Popup from '../Employee/Popup';
import { IoChevronBackCircleSharp } from 'react-icons/io5';
import { MdModeEditOutline } from 'react-icons/md';
import EditTaskById from '../Employee/EditTaskById';
import ViewTaskById from '../Employee/ViewTaskById';

export default function TaskDetailsById({task, openPopup, setOpenPopup}) {
    //const [openPopup, setOpenPopup] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <div>
        {console.log(task)}
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
        {edit == true ? <EditTaskById  id={task.task_id} openPopup setOpenPopup/> : <ViewTaskById id={task.task_id}/>}
      </Popup>
    </div>

  )
}
