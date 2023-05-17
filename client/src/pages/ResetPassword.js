import React from 'react'
import { Avatar, ButtonGroup, colors, CopyrightText, ExtraText, StyledContainer, StyledFormArea, StyledFormButton, StyledTitle ,TextLink} from '../components/Styles'

import logo from './../assets/logo.png'

//formik
import {Formik, Form} from 'formik'
import { TextInput } from '../components/FormLib'

//icons
import {FiMail, FiLock, FiUser, FiPhone} from 'react-icons/fi'
import * as Yup from 'yup';

//Loader
import {ThreeDots} from 'react-loader-spinner'

//authentication using redux
import { connect } from 'react-redux';
import { resetPassword } from '../auth/actions/userActions'
import {useNavigate, useParams} from "react-router-dom"

function ResetPassword({resetPassword}) {

  const navigate = useNavigate();
  const { email } = useParams();

  return (
    <StyledContainer style={{justifyContent: 'center', alignItems: 'center'}}>

    <div>
      <StyledFormArea>
        <Avatar image={logo}/>
        <StyledTitle color={colors.theme} size={30}>Reset Password</StyledTitle>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: ""
          }}

          validationSchema = {Yup.object({
            password: Yup.string()
              .min(6, "Password is too short")
              .max(20, "Password is too long")
              .required("Required"),
            confirmPassword: Yup.string().required("Required").oneOf([Yup.ref("password")], "Passwords must match")
            
          })}
          onSubmit = {(values, {setSubmitting, setFieldError}) => {
            //console.log(values)
            resetPassword(email ,values.password, navigate, setFieldError , setSubmitting)
            setSubmitting(false)
          }}
        >
          {({isSubmitting}) => (
            <Form>

              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder='*********'
                icon={<FiLock/>}
              />

                <TextInput
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder='*********'
                icon={<FiLock/>}
              />
              <ButtonGroup>
                {!isSubmitting && (

                <StyledFormButton type="submit">
                  Reset Password
                </StyledFormButton>
                )}

                {isSubmitting && (
                  <ThreeDots
                    color={colors.theme}
                    height={49}
                    width={100}/>
                )}
              </ButtonGroup>
            </Form>
          )}
        </Formik>
        <ExtraText>
          Already have an account? <TextLink to='/login'>Login</TextLink> 
        </ExtraText>

      </StyledFormArea>
      <CopyrightText>All rights reserved &copy;2022</CopyrightText>
    </div>
    </StyledContainer>
  )
}

export default connect(null, {resetPassword})(ResetPassword);  