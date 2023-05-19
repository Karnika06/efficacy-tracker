import React, { useEffect, useState } from "react";
import { useSelector, connect } from "react-redux";
import AddTask from "./Employee/AddTask";
import 'chartjs-adapter-date-fns';
import enUS from 'date-fns/locale/en-US';
import { Doughnut, Line, Pie } from "react-chartjs-2";
import {
  Chart,
  Tooltip,
  Title,
  ArcElement,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,TimeScale, LineController
} from "chart.js";
import ChartContainer from "../components/Admin/ChartContainer";
import { getTask } from "../auth/actions/tasksActions";
import Widget from "../components/Shared/Widget";
import {MdArrowBackIosNew} from "react-icons/md";
import WidgetTwo from "../components/Shared/WidgetTwo";
import Popup from "../components/Employee/Popup";
import MoodForm from "../components/Employee/MoodForm";
import { colors } from "../components/Styles";
import useViewport from "../viewport/useViewport";

// import {Chart} from "chart.js";

Chart.register(
  Tooltip,
  Title,
  ArcElement,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale, LineController
);

function EmployeeDashboard({getTask}) {

  const [startDate, setStartDate] = useState('2023-01-01')
  const [lastDate, setLastDate] = useState('2023-12-31')
  const [openPopup, setOpenPopup] = useState(false);
  const { isMobile, isTablet } = useViewport();
  
  const taskData = useSelector((state) => state.tasks.tasks);
  const [tasksData, setTasksData] = useState(taskData)

  const employee_id = useSelector((state) => state.user.User.id);

  const todaysTasks = tasksData?.filter(
    (taskData) =>
      new Date(taskData.created_at).toJSON().slice(0, 10) ==
      new Date().toJSON().slice(0, 10)
  );

  useEffect(() => {
    
    //console.log(employee_id)
    //getTask(employee_id);
    //console.log(tasksData);
    setTasksData(taskData)
    
  }, [taskData]);

  const statusMapping = {
    "Not started": 4,
    "Stuck": 3,
    "Working on it": 2,
    "Done": 1,
  };

  const difficultyMapping = {
    Easy: 1,
    Medium: 2,
    Hard: 3,
  };

  const completedPreviousTasks = taskData?.filter(task => task.task_status === 'Done');
  const completedTodaysTasks = todaysTasks?.filter(task => task.task_status === 'Done');

  function handleDuration(startTime, endTime) {
    //event.preventDefault();
    // Calculate duration here
    const start = new Date(startTime);
    const end = new Date(endTime);
    const present = new Date();
    const durationInMinOfNumerator = present.getTime() - start.getTime()
    const durationInMs = end.getTime() - start.getTime();
    const durationInHours = Math.floor(durationInMs / (1000 * 60 * 60));
    const durationInHoursOfNumerator = Math.floor( durationInMinOfNumerator / (1000 * 60 * 60));
    
    return durationInHoursOfNumerator/ durationInHours
    //setDuration(durationInHours);

    //return durationInHours;
  }

  const efficiency = (duration, status, difficulty, priority, startTime, dueTime) => {
    const statusValue = statusMapping[status];
    const difficultyValue = difficultyMapping[difficulty];
    const timeTaken = handleDuration(startTime, dueTime)
    //console.log(timeTaken)
    //return (priority * (timeTaken * Math.log(1 + difficultyValue)));
    return (Math.sqrt(priority) * 1/timeTaken * Math.log(1 + difficultyValue));
  };

  const CalcEfficiency = tasksData.reduce((acc, task) => {
    const taskEfficiency = efficiency(
      task.task_duration,
      task.task_status,
      task.task_level,
      task.task_priority,
      task.startDate, task.dueDate

    );
    
    return acc + taskEfficiency;
  }, 0);

  // group the tasks by date
  const groupedTasks = tasksData.reduce((acc, task) => {
    const date = new Date(task.created_at).toISOString().slice(0, 10); // get the date string, e.g. "Tue Mar 22 2022"
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {});

  // calculate the total efficiency for each date
  const efficiencyByDate = Object.entries(groupedTasks).map(([date, tasks]) => {
    const totalEfficiency = tasks.reduce(
      (acc, task) =>
        acc + efficiency(task.task_duration, task.task_status, task.task_level, task.task_priority, task.startDate, task.dueDate),
      0
    );
    
    return {
      
      date,
      efficiency: totalEfficiency / tasks?.length, // calculate the average efficiency for that date
    };
  });

  const data = {
    labels: efficiencyByDate.map((date) => date.date),
    datasets: [
      {
        label: "Employee Efficiency",
        data: efficiencyByDate.map((date) => date.efficiency),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Line Chart',
      },
    },
    scales: {
      x: {
        min: startDate,
        max: lastDate,
        type: 'time',
          time: {
            unit: 'day'
          },
        title: {
          
          display: true,
          text: 'Month',
        },
        adapters: {
          date: {
            locale: enUS, // <-- provide the complete adapter with localize property
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Employee Efficiency',
        },
        suggestedMin: 0,
        suggestedMax: 3,
      },
    },
  };

  // const myChart = 
  //   document.getElementById('myChart')

  function filterChart(date){
    console.log(date)
    const year = date.substring(0,4);
    const month = date.substring(5,7);

    const lastDay = (y, m) => {
      return new Date(y, m, 0).getDate()
    }

    

    const startDate = `${date}-01`
    const endDate = `${date}-${lastDay(year, month)}` 

    setStartDate(startDate); 
    setLastDate(endDate);
    //myChart.update()
  }

  function reset(){
    setStartDate('2023-01-01')
    setLastDate('2023-12-31')
  }


  const GraphStyling = {
    width: "100%",
    backgroundColor: colors.light1,
    padding: "2%",
    borderRadius: "15px",
    marginBottom: isMobile ? '20px' : ''
  };

  const mood =
    {
      title: 'DAILY MOOD',
      count: '45%',
      //link: '/employee/todaystasks',
      linkTo: 'Take Mood Quiz Now',
      color: colors.theme,
      icon: <MdArrowBackIosNew style = {{rotate: '180deg'}}/>,
      subtitle: 'Take your daily mood quiz to help us track your mood',
      textColor: colors.light1
    }

    const todayTasks =
    {
      title: 'TODAYS TASKS',
      count: '45%',
      link: '/employee/todaystasks',
      linkTo: 'All Todays Tasks',
      color: colors.light1,
      subtitle: 'You have completed '+ completedTodaysTasks?.length +' out of '+ todaysTasks?.length +' todays tasks',
      icon: <MdArrowBackIosNew style = {{rotate: '180deg'}}/>,
      textColor: colors.dark2
    }

    const previousTasks =
    {
      title: 'ALL TASKS',
      count: '70%',
      link: '/employee/previousTasks',
      linkTo: 'All Tasks',
      color: colors.light1,
      subtitle: 'You have completed '+ completedPreviousTasks?.length +' out of '+ tasksData?.length +' previous tasks',
      icon: <MdArrowBackIosNew style = {{rotate: '180deg'}}/>,
      textColor: colors.dark2
      
    }

  return (
    <>
      <div style={{ width: "100%", margin: isMobile ? '3%' : "1.5%" }}>
        {/* Total efficiency score: {CalcEfficiency} */}
        {/* {console.log(efficiencyByDate)} */}
        <div className="top-dashboard" style = {{display:  isMobile ? 'block' : 'flex', gap: '20px', marginBottom: '20px'}}>
          <WidgetTwo type={todayTasks} />
          <WidgetTwo type={previousTasks} />
          <WidgetTwo type={mood} handleClick = {() => setOpenPopup(!openPopup)}/>
          
        </div>
        <div style={GraphStyling}>
          <Line id = 'myChart' options = {options} data={data} style={{backgroundColor: colors.light1}}/>
          <input type="month" onChange={(e) => filterChart(e.target.value)}/>
          <button onClick = {() => reset()}>Reset</button>
        </div>

        <ChartContainer tasks = {tasksData}/>
      </div>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title= "Mood Tracker"
      >
        <MoodForm/>
      </Popup>
    </>
  );
}

export default connect(null, { getTask })(EmployeeDashboard);