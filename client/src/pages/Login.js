import React from 'react'
import { Avatar, ButtonGroup, colors, CopyrightText, ExtraText, StyledContainer, StyledFormArea, StyledFormButton, StyledTitle ,TextLink} from '../components/Styles'

import logo from './../assets/logo.png'

//formik
import {Formik, Form} from 'formik'
import { TextInput } from '../components/FormLib'

//icons
import {FiMail, FiLock} from 'react-icons/fi'
import * as Yup from 'yup';

//Loader
import {ThreeDots} from 'react-loader-spinner'

//authentication using redux
import { connect } from 'react-redux';
import { loginUser } from '../auth/actions/userActions'
import {useNavigate} from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginValidations } from '../components/Validations'

function Login({loginUser}) {

  const navigate = useNavigate();

  return (
    <StyledContainer style={{justifyContent: 'center', alignItems: 'center'}}>

    <div>
    <ToastContainer/>
      <StyledFormArea>
        <Avatar image={logo}/>
        <StyledTitle color={colors.theme} size={30}>Member Login</StyledTitle>
        <Formik
          initialValues={{
            email: "",
            password: "",
            
          }}

          validationSchema = {LoginValidations}
          onSubmit = {(values, {setSubmitting, setFieldError}) => {
            //console.log('just checking',values)
            loginUser(values, navigate, setFieldError , setSubmitting)
          }}
        >
          {({isSubmitting}) => (
            <Form>
              <TextInput
                name="email"
                type="text"
                label="Email Address"
                placeholder='email@example.com'
                icon={<FiMail/>}
              />
              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder='*********'
                icon={<FiLock/>}
              />
              <ButtonGroup>
                {!isSubmitting && (

                <StyledFormButton type="submit">
                  Login
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
          New here? <TextLink to='/signup'>Signup</TextLink> 
        </ExtraText>
        <ExtraText>
          Forgot password? <TextLink to='/forgot'>Reset</TextLink> 
        </ExtraText>

      </StyledFormArea>
      <CopyrightText>All rights reserved &copy;2022</CopyrightText>
    </div>
    </StyledContainer>
  )
}

export default connect(null, {loginUser})(Login);