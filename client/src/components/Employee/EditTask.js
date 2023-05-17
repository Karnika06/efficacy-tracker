import { Form, Formik } from 'formik';
import React from 'react'
import { CustomSelect, RadioButtons, TextInput } from '../FormLib';
import { ButtonGroup, colors, StyledFormArea, StyledFormButton, StyledTitle } from '../Styles';

export default function EditTask() {
    const radioOptions = [
        {
            key: '1',
            value: '1'
        },
        {
            key: '2',
            value: '2'
        },
        {
            key: '3',
            value: '3'
        },
        {
            key: '4',
            value: '4'
        },
        {
            key: '5',
            value: '5'
        },
    ]
  return (
    <div>
      <Formik initialValues={{
            task_name: "",
            status: "",
            duration: "",
            priority: "",
            level: "",
            dueDate: "",
            startDate: "",
            
          }}
          onSubmit = {(values, {setSubmitting, setFieldError}) => {
            // values.employee_id = userData.id
            console.log(values)

            // addTask(values, setFieldError , setSubmitting)
          }}>
            {({isSubmitting}) => (
        <Form>
          <StyledFormArea>
            <StyledTitle color={colors.theme} size={40}>
              Add your task
            </StyledTitle>

            <TextInput
              name="task_name"
              type="text"
              label="What is your task?"
              placeholder="Type your task here..."
            />

            <CustomSelect
                name="status"
                type="text"
                label="Progress status"
                placeholder="Status">
                    <option value="">Please select work status</option>
                    <option value="Not started">Not started</option>
                    <option value="Working on it">Working on it</option>
                    <option value="Stuck">Stuck</option>
                    <option value="Done">Done</option>
                    <option value="Failed">Failed</option>
                    <option value="Problem">Problem</option>
            </CustomSelect>

            <TextInput
              name="duration"
              type="text"
              label="Duration"
              placeholder="Duration"
            />

            <RadioButtons 
                control='radio'
                label='Priority'
                name= 'priority'
                options={radioOptions}
            />
            
            <CustomSelect
                name="level"
                label="Difficulty level"
                placeholder="Please select a difficulty level">
                    <option value="">Please select a difficulty level</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
            </CustomSelect>

            <TextInput name="dueDate" type="date" label="Due date" />

            <TextInput name="startDate" type="date" label="Start date" />

            <ButtonGroup>
              <StyledFormButton type="submit">Save</StyledFormButton>
            </ButtonGroup>
          </StyledFormArea>
        </Form>
        )}
      </Formik>
    </div>
  );
}
