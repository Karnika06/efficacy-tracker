import { Field, Form, Formik } from "formik";
import React from "react";
import { connect, useSelector } from "react-redux";
import {
  CustomSelect,
  RadioButtons,
  RadioInputBox,
  TextInput,
  TextInputBox,
} from "../../components/FormLib";
import {
  ButtonGroup,
  colors,
  StyledButton,
  StyledFormArea,
  StyledFormButton,
  StyledTitle,
} from "../../components/Styles";

import { addTask } from "../../auth/actions/tasksActions";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { InfoContainer } from "../../components/Employee/UserProfileStyle";
import { AddTaskValidations } from "../../components/Validations";

function AddTask({ addTask }) {
  const navigate = useNavigate();

  // const  userData  = useSelector(
  //     (state) => state.session.user
  //   );
  const userData = useSelector((state) => state.user.User);

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
    <div>
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

        validationSchema = {AddTaskValidations}

        onSubmit={(values, { setSubmitting, setFieldError }) => {
          values.employee_id = userData.id;
          console.log(values);
          values.duration = handleDuration(values.startDate, values.dueDate);
          addTask(values, setFieldError, setSubmitting, navigate);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <StyledFormArea style={{textAlign: 'left'}}>
              <StyledTitle color={colors.theme} size={40}>
                Add your task
              </StyledTitle>
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
            </StyledFormArea>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default connect(null, { addTask })(AddTask);
