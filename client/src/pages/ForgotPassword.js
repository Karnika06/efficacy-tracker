import React from "react";
import {
  Avatar,
  ButtonGroup,
  CopyrightText,
  StyledContainer,
  StyledFormArea,
  StyledFormButton,
  StyledTitle,
  colors,
} from "../components/Styles";
import { FiMail } from "react-icons/fi";
import { TextInput } from "../components/FormLib";
import { Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";
import logo from "./../assets/logo.png";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import { generateOTP } from "../auth/actions/userActions";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

    const navigate = useNavigate()

  return (
    <StyledContainer style={{ justifyContent: "center", alignItems: "center" }}>
      <div>
        <ToastContainer />
        <StyledFormArea>
          <Avatar image={logo} />
          <StyledTitle color={colors.theme} size={30}>
            Forgot Password
          </StyledTitle>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            })}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              // console.log("just checking", values);
              generateOTP(values, navigate)
              setSubmitting(false)
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <TextInput
                  name="email"
                  type="text"
                  label="Email Address"
                  placeholder="email@example.com"
                  icon={<FiMail />}
                />

                <ButtonGroup>
                  {!isSubmitting && (
                    <StyledFormButton type="submit">Send OTP</StyledFormButton>
                  )}

                  {isSubmitting && (
                    <ThreeDots color={colors.theme} height={49} width={100} />
                  )}
                </ButtonGroup>
              </Form>
            )}
          </Formik>
        </StyledFormArea>
        <CopyrightText>All rights reserved &copy;2023</CopyrightText>
      </div>
    </StyledContainer>
  );
}
