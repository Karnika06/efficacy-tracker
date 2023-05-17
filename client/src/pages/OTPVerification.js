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
import { ErrorMessage, Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";
import logo from "./../assets/logo.png";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import { generateOTP, verifyOTP } from "../auth/actions/userActions";
import { useNavigate, useParams } from "react-router-dom";

export default function OTPVerification() {

    const navigate = useNavigate()

  const { email } = useParams();

    const otpSchema = Yup.object().shape({
        otpCode: Yup.number()
          .typeError('OTP must be a number')
          .required('OTP is required')
          .test('len', 'OTP must be exactly 6 digits', (val) => {
            if (val) {
              return val.toString().length === 6;
            }
            return false;
          }),
      });

  return (
    <StyledContainer style={{ justifyContent: "center", alignItems: "center" }}>
      <div>
        <ToastContainer />
        <StyledFormArea>
          <Avatar image={logo} />
          <StyledTitle color={colors.theme} size={30}>
            OTP Verification
          </StyledTitle>
          <Formik
            initialValues={{
              otpCode: "",
            }}
            validationSchema={otpSchema}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              //console.log("just checking", values);
              verifyOTP(values, email, navigate)
              setSubmitting(false)
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <TextInput
                  name="otpCode"
                  type="number"
                  label="Enter OTP"
                  placeholder="--- ---"
                  icon={<FiMail />}
                />

                <ButtonGroup>
                  {!isSubmitting && (
                    <StyledFormButton type="submit">Verify OTP</StyledFormButton>
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
