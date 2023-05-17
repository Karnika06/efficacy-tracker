import React, { useState } from "react";
import "./EmployeeCard.css";
import dp from "../../assets/testdp.jpeg";
import Avatar from "@mui/material/Avatar";
import { MdOutlineEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdPermIdentity } from "react-icons/md";
import { Divider } from "@mui/material";
import { GrLocation } from "react-icons/gr";
import { AiOutlineLinkedin } from "react-icons/ai";
import { connect, useSelector } from "react-redux";
import { ButtonGroup, StyledFormArea, StyledFormButton, StyledTitle, colors } from "../Styles";
import Popup from "../Employee/Popup";
import { Form, Formik } from "formik";
import { InfoContainer } from "../Employee/UserProfileStyle";
import { CustomSelect, RadioInputBox, TextInputBox } from "../FormLib";
import { addTask } from "../../auth/actions/tasksActions";


function EmployeeCard({id, addTask}) {

  const [openPopup, setOpenPopup] = useState(false);

  const employeeData = useSelector((state) => state.employees.employees.filter(employees => employees.id == id));

  function handleDuration(startTime, endTime) {
    //event.preventDefault();
    // Calculate duration here
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInMs = end.getTime() - start.getTime();
    const durationInHours = Math.floor(durationInMs / (1000 * 60 * 60));
    //setDuration(durationInHours);

    return durationInHours;
  }

  const radioOptions = [
    {
      key: "1",
      value: "1",
    },
    {
      key: "2",
      value: "2",
    },
    {
      key: "3",
      value: "3",
    },
    {
      key: "4",
      value: "4",
    },
    {
      key: "5",
      value: "5",
    },
  ];

  return (
    
    <div className="card-container">
      <div className="emp-avatar">
        {/* <img src={dp} alt='Display Pic'/> */}
        <Avatar alt="Display Pic" src={dp} sx={{ width: 90, height: 90 }} />
        <div className="employee-id" style={{ display: "flex", marginTop: '10%' }}>
          <MdPermIdentity />
          <p>{employeeData[0].id}</p>
        </div>
      </div>

      <div className="about-details">
        <h3 style={{marginBottom: '1%'}}>{employeeData[0].name}</h3>
        <h4 style={{marginBottom: '3%'}}>Developer</h4>
        <p style={{marginBottom: '4%'}}>
          Hi, I’m Louis. I’m amazing. I’m super knowledgeable, creative, and
          intelligent. I’m at the cutting edge of my field and I’m quite skilled
          in all things business-related.
        </p>
        <StyledFormButton onClick={() => setOpenPopup(!openPopup)}>Give Task</StyledFormButton>
      </div>

      <Divider orientation="vertical" variant="middle" flexItem />

      <div className="contact-details">
        <div className="icon-description">
          <MdOutlineEmail size={20}/>
          <p className="icon-desc">{employeeData[0].email}</p>
        </div>
        <div className="icon-description">
          <MdPhone size={20}/>
          <p className="icon-desc">{employeeData[0].contactNumber}</p>
        </div>
        <div className="icon-description">
          <GrLocation size={20}/>
          <p className="icon-desc">127/744, Saket Nagar, Kanpur Nagar, 208014</p>
        </div>
        <div className="icon-description">
          <AiOutlineLinkedin size={20}/>
          <p className="icon-desc">karnika/dnsnd/sjdn</p>
        </div>
      </div>
      <Popup openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title={
          'Add Task'
        }>
          <Formik
        initialValues={{
          task_name: "",
          status: "",
          duration: "",
          priority: "",
          level: "",
          dueDate: "",
          startDate: "",
          task_desc: "",
        }}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          values.employee_id = employeeData[0].id;
          console.log(values);
          values.duration = handleDuration(values.startDate, values.dueDate);
          addTask(values, setFieldError, setSubmitting);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            
              
              <InfoContainer>
                <TextInputBox
                  name="task_name"
                  type="text"
                  label="Task title"
                  placeholder="Type title of your task..."
                  height="45px"
                />

                <TextInputBox
                  name="task_desc"
                  type="text"
                  label="Task Description"
                  placeholder="Type task description..."
                  textarea="true"
                  height="60px"
                />

                {/* <TextInput
              name="task_name"
              type="text"
              label="What is your task?"
              placeholder="Type your task here..."
            /> */}

                <CustomSelect
                  name="status"
                  type="text"
                  label="Progress status"
                  placeholder="Status"
                  height="45px"
                >
                  <option value="">Please select work status</option>
                  <option value="Not started">Not started</option>
                  <option value="Working on it">Working on it</option>
                  <option value="Stuck">Stuck</option>
                  <option value="Done">Done</option>
                  {/* <option value="Failed">Failed</option>
                    <option value="Problem">Problem</option> */}
                </CustomSelect>

                <RadioInputBox
                  control="radio"
                  label="Priority"
                  name="priority"
                  options={radioOptions}
                  placeholder="Priority"
                />

                <CustomSelect
                  name="level"
                  label="Difficulty level"
                  placeholder="Please select a difficulty level"
                  height="45px"
                >
                  <option value="">Please select a difficulty level</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </CustomSelect>

                <TextInputBox
                  name="startDate"
                  type="datetime-local"
                  label="Start date"
                  height="45px"
                />

                <TextInputBox
                  name="dueDate"
                  type="datetime-local"
                  label="Due date"
                  height="45px"
                />

                <ButtonGroup>
                  <StyledFormButton type="submit">Save</StyledFormButton>
                </ButtonGroup>
              </InfoContainer>
            
          </Form>
        )}
      </Formik>
        </Popup>
    </div>
  );
}

export default connect(null, { addTask })(EmployeeCard);