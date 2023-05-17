import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { getTask } from "../../auth/actions/tasksActions";
import NoTask from "../../components/Employee/NoTask";
import Popup from "../../components/Employee/Popup";
import TaskCard from "../../components/Employee/TaskCard";
import ViewTaskById from "../../components/Employee/ViewTaskById";
import { colors } from "../../components/Styles";

function PreviousTasks({ getTask }) {

  const tasksData = useSelector((state) => state.tasks.tasks);

  const employee_id = useSelector((state) => state.user.User.id);

  const [openPopup, setOpenPopup] = useState(false)

  useEffect(() => {
    //console.log(employee_id)
    getTask(employee_id);
    //console.log(tasksData);
    
  }, []);

  // const getUniqueDates =()=> {
  //     let i,d,m,y
  //     for(i = 0; i< tasksData.length(); i++){
  //         const date = new Date(tasksData[i].created_at)
  //         d = date.getDate();
  //         m = date.getMonth()+1;
  //         y = date.getFullYear();
  //     }
  //     return d+'-'+m+'-'+y
  // }

  const uniqueDates = [
    ...new Set(
      tasksData?.map(({ created_at }) =>
        new Date(created_at).toJSON().slice(0, 10)
      )
    ),
  ];

  return (
    <div>
      {/* <StyledFormArea> */}

      {tasksData.length == 0 ? null : (
        <>
          <h2
            style={{
              color: colors.primary,
              fontSize: "30px",
              marginLeft: "10px",
              marginBottom: '2%'
            }}
          >
            My Tasks
          </h2>

          <div className="task-heading">
            <div className="dummy1"></div>
            <h3 className="column-title" style={{ color: colors.primary }}>
              Task Name
            </h3>
            <h3 className="column-title" style={{ color: colors.primary }}>
              Status
            </h3>
            <h3 className="column-title" style={{ color: colors.primary }}>
              Priority
            </h3>
            <h3 className="column-title" style={{ color: colors.primary }}>
              Level
            </h3>
            <h3 className="column-title" style={{ color: colors.primary }}>
              Start date
            </h3>
            <h3 className="column-title" style={{ color: colors.primary }}>
              Due date
            </h3>
            <div className="dummy2"></div>
          </div>
        </>
      )}
      <div className="task-container">

      {tasksData.length ? (
          tasksData && uniqueDates?.map((uniqueDate, dateIndex) => (
            <div key={dateIndex}>
              <h3 style={{color: colors.primary,
              fontSize: "20px",
              marginLeft: "10px",  
              marginBottom: '2%', marginTop: '2%'}}>{uniqueDate}</h3>
              {tasksData.filter(tasks => new Date(tasks.created_at).toJSON().slice(0, 10) === uniqueDate)
                .map((filteredTask, taskIndex) => (
                  <TaskCard emp = {employee_id} task = {filteredTask} />
                ))
              }
              </div>
          ))
          ) 
         : (<NoTask/>)
      }


        {/* {tasksData.length ? (
          tasksData.map((tasks, key) => <TaskCard task={tasks} />)
        ) : (
          <NoTask />
        )} */}
      </div>
      {/* </StyledFormArea> */}
      {/* <Popup openPopup = {openPopup}
        setOpenPopup = {setOpenPopup}
        >
          <ViewTaskById/>
      </Popup> */}
    </div>
  );
}

export default connect(null, { getTask })(PreviousTasks);
