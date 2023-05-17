import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import ProgressBar from "./ProgressBar";
import { colors } from "../Styles";
import useViewport from "../../viewport/useViewport";

export default function ChartContainer({ tasks }) {

  const {isMobile, isTablet} = useViewport()
  //const tasksData = useSelector((state) => state.tasks.tasks);

  const difficultyLevel = tasks.map(({ task_level }) => task_level);

  const countEasy = difficultyLevel.filter((item) => item === "Easy").length;
  const countMedium = difficultyLevel.filter(
    (item) => item === "Medium"
  ).length;
  const countHard = difficultyLevel.filter((item) => item === "Hard").length;

  const progressBar = tasks.map(({ task_status }) => task_status);

  const countCompleted = progressBar.filter((item) => item === "Done").length;
  const countStuck = progressBar.filter((item) => item === "Stuck").length;
  const countWorking = progressBar.filter(
    (item) => item === "Working on it"
  ).length;
  const countNotStart = progressBar.filter(
    (item) => item === "Not started"
  ).length;

  const percentCompleted = Math.round(
    (countCompleted / progressBar.length) * 100
  );
  const percentStuck = Math.round((countStuck / progressBar.length) * 100);
  const percentWorking = Math.round((countWorking / progressBar.length) * 100);
  const percentNotStart = Math.round(
    (countNotStart / progressBar.length) * 100
  );

  //useEffect(() => {

  //console.log(difficultyLevel)
  //   const countEasy = difficultyLevel.filter((item) => item === 'Easy').length;
  //   const countMedium = difficultyLevel.filter((item) => item === 'Medium').length;
  //   const countHard = difficultyLevel.filter((item) => item === 'Hard').length;
  //}, [])

  const data = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "Difficulty Level",
        data: [countEasy, countMedium, countHard],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const divStyling = {
    width: isMobile ? '100%' : "20%",
    backgroundColor: colors.light1,
    borderRadius: "10px",
    margin: "1.5% 1.5% 0 0",
    marginBottom: isMobile ? '20px' : ''
  };

  const ProgressStyling = {
    width: isMobile ? '100%' :"80%",
    height: "50%",
    backgroundColor: colors.light1,
    borderRadius: "10px",
    padding: isMobile ? "2.5% 6%": "1.5% 3.4%",
    marginTop: "1.5%",
    
  };

  return (
    <div
      className="chart-container"
      style={{ display: isMobile ? 'block' : "flex", justifyContent: "space-evenly" }}
    >
      <div style={divStyling}>
        <h3 className="heading" style={{    padding: isMobile ? '4%' : '5.5%'}}>
          Task Level
        </h3>
        <div
          style={{
            width: "100%",
            height: '100%',
            borderRadius: "10px",
            padding: "1.5%",
          }}
        >
          <Doughnut data={data} />
          {tasks.length == 0 && <h3 style={{textAlign: 'center'}}>No Tasks added</h3>}
        </div>
      </div>
      <div style={ProgressStyling}>
        <h3 className="heading" style={{     padding: isMobile ? '1%' : ''}}>Progress Bar</h3>
        <ProgressBar
          bgcolor="#4CAF50"
          progress={percentCompleted}
          label="Completed"
          height={30}
        />
        <ProgressBar
          bgcolor=" #FFC107"
          progress={percentWorking}
          label="Working on it"
          height={30}
        />
        <ProgressBar
          bgcolor="#F44336"
          progress={percentStuck}
          label="Stuck"
          height={30}
        />
        <ProgressBar
          bgcolor="#9E9E9E"
          progress={percentNotStart}
          label="Not started"
          height={30}
        />
      </div>
    </div>
  );
}
