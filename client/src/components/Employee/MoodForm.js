import React from "react";
import "./MoodForm.css";
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from "formik";
import Moods from "./Moods";
import { ButtonGroup, StyledFormButton } from "../Styles";
import SelectReason from "./SelectReason";
import { TextInputBox } from "../FormLib";
import { connect, useSelector } from "react-redux";
import { addMoodData } from "../../auth/actions/moodActions";

function MoodForm({addMoodData}) {

    const userData = useSelector((state) => state.user.User);


  return (
    <>
      <div style={{ padding: "2%" }}>
        <Formik
          initialValues={{
            employee_mood: "",
            mood_reason: [],
            message: "",
          }}

          const validationSchema = {Yup.object().shape({
            employee_mood: Yup.string().required("Above mood field is required!"),
          })
        }
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            values.employee_id = userData.id;
            console.log(values);
            addMoodData(values)
          }}
        >
          {({ values, errors, touched,setFieldValue, isSubmitting }) => (
            <Form>
              <Moods
                name="employee_mood"
                label="How is your mood today?"
                value={values.employee_mood}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />
              <ErrorMessage
                name="employee_mood"
                component="div"
                className="invalid-feedback"
                style={{color: '#DC2626'}}
              />
              <SelectReason
                name="mood_reason"
                label="Select reason (multiple choice possible) "
                value={values.mood_reason}
                setFieldValue={setFieldValue}
              />

           

<TextInputBox
                name="message"
                type="text"
                label="Message"
                placeholder="Your comment (optional)"
                
                textarea="true"
                width="100%"
              />

              <ButtonGroup>
                <StyledFormButton type="submit">Save</StyledFormButton>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default connect(null, {addMoodData})(MoodForm);