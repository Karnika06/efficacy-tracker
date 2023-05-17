import React, { useEffect } from "react";
import TaskCard from "../../components/Employee/TaskCard";
import { colors, StyledFormArea, StyledTitle } from "../../components/Styles";
import "../../components/Employee/TaskCard.css";
import { AiFillDelete } from "react-icons/ai";

import { connect, useSelector } from "react-redux";

// actions
import { getTask } from "../../auth/actions/tasksActions";
import NoTask from "../../components/Employee/NoTask";

function TodaysTasks({ getTask }) {
  const tasksData = useSelector((state) => state.tasks.tasks);

  //const employee_id = useSelector((state) => state.session.user.id);
  
  const employee_id = useSelector((state) => state.user.User.id);

  useEffect(() => {
    getTask(employee_id);
    // console.log(tasksData);
    // console.log(todaysTasks);
  }, []);

  const todaysTasks = tasksData.filter(
    (taskData) =>
      new Date(taskData.created_at).toJSON().slice(0, 10) ==
      new Date().toJSON().slice(0, 10)
  );

  const taskData = [
    {
      title: "Make a login form",
      status: "Working on it",
      priority: "4",
      level: "Medium",
      dueDate: "25-01-2023",
      startDate: "25-01-2023",
    },
    {
      title: "Make a login form",
      status: "Done",
      priority: "2",
      level: "Hard",
      dueDate: "25-01-2023",
      startDate: "25-01-2023",
    },
    {
      title: "Make a login form",
      status: "Stuck",
      priority: "",
      level: "Easy",
      dueDate: "25-01-2023",
      startDate: "25-01-2023",
    },
    {
      title: "Make a login form",
      status: "Working on it",
      priority: "5",
      level: "Medium",
      dueDate: "25-01-2023",
      startDate: "25-01-2023",
    },
  ];
  return (
    <div>
      {/* <StyledFormArea> */}

      {tasksData.length == 0 || todaysTasks == 0 ? null : (
        <>
          <h2
            style={{
              color: colors.primary,
              fontSize: "30px",
              marginLeft: "10px",
              marginBottom: "2%"
            }}
          >
            Today's Tasks
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
          todaysTasks.length > 0 ? (
            todaysTasks.map((tasks, key) => <TaskCard emp = {employee_id} task={tasks} />)
          ) : (
            <NoTask />
          )
        ) : (
          <NoTask/>
        )}
      </div>
      {/* </StyledFormArea> */}
      
    </div>
  );
}

export default connect(null, { getTask })(TodaysTasks);
