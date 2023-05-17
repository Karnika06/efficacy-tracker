import React from 'react'
import { Field, Form, Formik } from "formik";
import { ButtonGroup, colors, StyledFormArea, StyledFormButton, StyledTitle } from '../../components/Styles';
import { TextInput } from '../../components/FormLib';
import { connect, useSelector } from 'react-redux';
import { addFeedback } from '../../auth/actions/feedbackActions';


function Feedback({addFeedback}) {

    // const  userData  = useSelector(
    //     (state) => state.session.user
    //   );
      const  userData  = useSelector(
        (state) => state.user.User
      );

  return (
    <div>
        <Formik initialValues={{
            feedback: ""
            
          }}
          onSubmit = {(values, {setSubmitting, setFieldError}) => {
            
            values.employee_id = userData.id
            //console.log(values)
            addFeedback(values, setFieldError , setSubmitting)
            
          }}>
            <Form>
            <StyledFormArea>
            <StyledTitle color={colors.theme} size={40}>
              Give your feedback...
            </StyledTitle>
            <TextInput
              name="feedback"
              type="text"
              
              placeholder="Give your feedback..."
            />
            <ButtonGroup>
              <StyledFormButton type="submit">Submit feedback</StyledFormButton>
            </ButtonGroup>
            </StyledFormArea>
            </Form>
          </Formik>
    </div>
  )
}


export default connect(null, {addFeedback})(Feedback);