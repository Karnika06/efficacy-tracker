import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import "./EmployeeTasks.css";
import { getTask } from "../../auth/actions/tasksActions";

import MaterialTable from "material-table";
import { forwardRef } from "react";

import AddBox from "@mui/icons-material/AddBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Check from "@mui/icons-material/Check";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Clear from "@mui/icons-material/Clear";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Edit from "@mui/icons-material/Edit";
import FilterList from "@mui/icons-material/FilterList";
import FirstPage from "@mui/icons-material/FirstPage";
import LastPage from "@mui/icons-material/LastPage";
import Remove from "@mui/icons-material/Remove";
import SaveAlt from "@mui/icons-material/SaveAlt";
import Search from "@mui/icons-material/Search";
import ViewColumn from "@mui/icons-material/ViewColumn";
import Alert from "@mui/icons-material/Error";
import { ThemeProvider, createTheme } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChartContainer from "./ChartContainer";
import TaskDetailsById from "./TaskDetailsById";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Eye: forwardRef((props, ref) => <VisibilityIcon {...props} ref={ref} />),
};

function EmployeeTasks({ id, getTask }) {
  const tasksData = useSelector((state) => state.tasks.tasks);

  const defaultMaterialTheme = createTheme();

  const [openPopup, setOpenPopup] = useState(false);
  const [viewTask, setViewTask] = useState({});

  useEffect(() => {
    getTask(id);
    //console.log(tasksData);
  }, []);

  var columns = [
    { title: "id", field: "task_id", hidden: "true" },
    { title: "Task Name", field: "task_name" },
    { title: "Task Status", field: "task_status" },
    { title: "Task Duration", field: "task_duration" },
    { title: "Task Priority", field: "task_priority" },
    { title: "Task Level", field: "task_level" },
    { title: "Start date", field: "startDate" },
    { title: "Last date", field: "dueDate" },
    { title: "Task Creation date", field: "created_at" },
  ];
  const [data, setData] = useState([]); //table data

  const todaysTasks = tasksData.filter(
    (taskData) =>
      new Date(taskData.created_at).toJSON().slice(0, 10) ==
      new Date().toJSON().slice(0, 10)
  );

  return (
    <>
      <ThemeProvider theme={defaultMaterialTheme}>
        <div className="task-container">
          <ChartContainer tasks={todaysTasks} />

          <MaterialTable
            mt={90}
            title="Today's Task Details"
            columns={columns}
            data={todaysTasks}
            icons={tableIcons}
            options={{
              headerStyle: {
                size: "80px",
                backgroundColor: "#1F2937",
                color: "rgb(211,211,211)",
              },
              //selection: true,
              //actionsColumnIndex: -1
            }}
            actions={[
              {
                position: "row",
                tooltip: "View Employee",
                icon: tableIcons.Eye,
                //onClick: (evt, data) => handlePopup(data)
              },
            ]}
            style={{
              marginTop: "2%",
              borderRadius: "10px",
              backgroundColor: "rgb(211,211,211)",
            }}
          />
        </div>
        <div className="task-container">
          <ChartContainer tasks={tasksData} />
          <MaterialTable
            mt={90}
            title="Previous Task Details"
            columns={columns}
            data={tasksData}
            icons={tableIcons}
            style={{
              marginTop: "1.5%",
              borderRadius: "10px",
              marginBottom: "5%",
              backgroundColor: "rgb(211,211,211)",
            }}
            options={{
              headerStyle: {
                size: "80px",
                backgroundColor: "#1F2937",
                color: "rgb(211,211,211)",
              },
              //selection: true,
              //actionsColumnIndex: -1
            }}
            actions={[
              {
                position: "row",
                tooltip: "View Task",
                icon: tableIcons.Eye,
                onClick: (evt, data) => (
                  <>
                    {setOpenPopup(!openPopup)}{" "}
                    {setViewTask(data)}

                    

                    {/* <TaskDetailsById
                      openPopup={openPopup}
                      setOpenPopup={setOpenPopup}
                      task={data}
                    /> */}
                  </>
                ),
              },
            ]}
          />
          {openPopup && <TaskDetailsById openPopup={openPopup}
                      setOpenPopup={setOpenPopup}
                      task= {viewTask}/>}
        </div>
      </ThemeProvider>
    </>
  );
}

export default connect(null, { getTask })(EmployeeTasks);
