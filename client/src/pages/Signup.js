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
import { signupUser } from '../auth/actions/userActions'
import {useNavigate} from "react-router-dom"
import { SignupValidations } from '../components/Validations'

function Signup({signupUser}) {

  const history = useNavigate();

  // CSS styles to hide number input spinner
const numberInputStyle = {
  WebkitAppearance: 'none',
  MozAppearance: 'textfield',
};

  return (
    <StyledContainer style={{justifyContent: 'center', alignItems: 'center'}}>

    <div>
      <StyledFormArea>
        <Avatar image={logo}/>
        <StyledTitle color={colors.theme} size={30}>Signup</StyledTitle>
        <Formik
          initialValues={{
            name: "",
            email: "",
            contact: "",
            password: "",
            confirmPassword: ""
          }}

          validationSchema = {SignupValidations}
          onSubmit = {(values, {setSubmitting, setFieldError}) => {
            console.log(values)
            signupUser(values, history, setFieldError , setSubmitting)
          }}
        >
          {({isSubmitting}) => (
            <Form>
                
                <TextInput
                name="name"
                type="text"
                label="Full Name"
                placeholder='Example Gupta'
                icon={<FiUser/>}
              />

              <TextInput
                name="email"
                type="text"
                label="Email Address"
                placeholder='email@example.com'
                icon={<FiMail/>}
              />
             

                <TextInput
                name="contact"
                type="number"
                label="Contact Number"
                placeholder='----- -----'
                icon={<FiPhone/>}
                
              />

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
                  Signup
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

export default connect(null, {signupUser})(Signup);  