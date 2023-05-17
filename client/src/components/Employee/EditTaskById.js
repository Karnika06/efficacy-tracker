import React from "react";
import { Field, Form, Formik } from "formik";
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
import { updateTask } from "../../auth/actions/tasksActions";
import { InfoContainer } from "./UserProfileStyle";
import { useNavigate } from "react-router-dom";

function EditTaskById({ id, emp, updateTask, setOpenPopup }) {
  const taskData = useSelector((state) =>
    state.tasks.tasks.filter((task) => task.task_id == id)
  );

  const navigate = useNavigate();

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
          task_name: taskData[0].task_name,
          status: taskData[0].task_status,
          duration: taskData[0].task_duration,
          priority: taskData[0].task_priority,
          level: taskData[0].task_level,
          dueDate: new Date(taskData[0].dueDate).toISOString().slice(0, -5),
          startDate: new Date(taskData[0].startDate).toISOString().slice(0, -5),

          task_desc: taskData[0].task_desc,
        }}
        onSubmit={(values,  { setSubmitting, setFieldError }) => {
          values.task_id = id;
          values.employee_id = emp;
          console.log(values);
          values.duration = handleDuration(values.startDate, values.dueDate);
          updateTask(values,setOpenPopup, setFieldError, setSubmitting, navigate);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InfoContainer>
              <TextInputBox
                name="task_name"
                type="text"
                label="What is your task?"
                placeholder="Type your task here..."
                height="45px"
              />

              <TextInputBox
                name="task_desc"
                type="text"
                label="Task Description"
                placeholder="Task description here..."
                height="45px"
              />

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
                <option value="Failed">Failed</option>
                <option value="Problem">Problem</option>
              </CustomSelect>

              {/* <TextInput
              name="duration"
              type="text"
              label="Duration"
              placeholder="Duration"
            /> */}

              <RadioInputBox
                control="radio"
                label="Priority"
                name="priority"
                options={radioOptions}
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
                name="dueDate"
                type="datetime-local"
                label="Due date"
                height="45px"
              />

              <TextInputBox
                name="startDate"
                type="datetime-local"
                label="Start date"
                height="45px"
              />

              <TextInputBox
                name="duration"
                type="text"
                label="Task Duration"
                placeholder="Task duration here..."
                height="45px"
                readOnly="true"
              />

              <ButtonGroup>
                <StyledFormButton type="submit">Update</StyledFormButton>
              </ButtonGroup>
            </InfoContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default connect(null, { updateTask })(EditTaskById);
