import React, { useState } from "react";
import { Field, useField } from "formik";
import {
  StyledTextInput,
  StyledLabel,
  StyledIcon,
  ErrorMsg,
} from "./../components/Styles";

//Eye for password
import { FiEyeOff, FiEye } from "react-icons/fi";
import {TiTick } from "react-icons/ti";
import {
  TextInputContainer,
  LabelBox,
  FieldContainer,
  RadioInputContainer,
  RadioLabel,
  TextAreaInputContainer,
  SelectInputContainer,
} from "./Employee/UserProfileStyle";
import { width } from "@mui/system";
import useViewport from "../viewport/useViewport";
import axios from "axios";


export const TextInput = ({ icon, ...props }) => {
  const [field, meta] = useField(props);
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>

      

      {props.type !== "password" && (
        <StyledTextInput
          invalid={meta.touched && meta.error}
          {...field}
          {...props}
        />
      )}
      

      {props.type === "password" && (
        <StyledTextInput
          invalid={meta.touched && meta.error}
          {...field}
          {...props}
          type={show ? "text" : "password"}
        />
      )}


      
      <StyledIcon>{icon}</StyledIcon>

      {props.type === "password" && (
        <StyledIcon onClick={() => setShow(!show)} right>
          {show && <FiEye />}
          {!show && <FiEyeOff />}
        </StyledIcon>
      )}

      {meta.touched && meta.error ? (
        <ErrorMsg>{meta.error}</ErrorMsg>
      ) : (
        <ErrorMsg style={{ visibility: "hidden" }}></ErrorMsg>
      )}
    </div>
  );
};

export const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { isMobile, isTablet } = useViewport();

  return (
    <FieldContainer style={{ width: isMobile ? "100%" : props.width }}>
      <LabelBox htmlFor={props.name}>{label}</LabelBox>
      <SelectInputContainer
        invalid={meta.touched && meta.error}
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error" : ""}
      />
      {/* <select
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error" : ""}
      /> */}
      {meta.touched && meta.error && <ErrorMsg style={{marginTop: '5px'}}>{meta.error}</ErrorMsg>}
    </FieldContainer>
  );
};

export const RadioButtons = (props) => {
  const { label, name, options, ...rest } = props;
  const [field, meta] = useField(props);

  return (
    <div>
      <StyledLabel htmlFor={props.name}>{label}</StyledLabel>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  style={{ margin: "2%" }}
                  className="radio-input-box"
                  type="radio"
                  id={option.id}
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                  
                />
                <label style={{ marginBottom: "2%" }} htmlFor={option.id}>
                  {option.key}
                </label>
                
              </React.Fragment>
            );
          });
        }}
        {meta.touched && meta.error && <ErrorMsg style={{marginTop: '5px'}}>{meta.error}</ErrorMsg>}
      </Field>
    </div>
  );
};

//For User Profile

export const TextInputBox = ({ ...props }) => {
  const [field, meta] = useField(props);
  const [show, setShow] = useState(false);
  const { isMobile, isTablet } = useViewport();

  return (
    <FieldContainer style={{ width: isMobile ? "100%" : props.width }}>
      <LabelBox htmlFor={props.name}>{props.label}</LabelBox>
      {props.textarea === "true" ? (
        <TextAreaInputContainer {...field} {...props} />
      ) : (
        <TextInputContainer
          invalid={meta.touched && meta.error}
          {...field}
          {...props}
        />
      )}

      {meta.touched && meta.error ? (
        <ErrorMsg style={{marginTop: '5px'}}>{meta.error}</ErrorMsg>
      ) : (
        <ErrorMsg style={{ visibility: "hidden" }}></ErrorMsg>
      )}
    </FieldContainer>
  );
};

export const RadioInputBox = (props) => {
  const { label, name, options, ...rest } = props;
  const [meta] = useField(props);
  const { isMobile, isTablet } = useViewport();

  return (
    <FieldContainer style={{ width: isMobile ? "100%" : props.width }}>
      <LabelBox htmlFor={props.name}>{label}</LabelBox>

      <RadioInputContainer>
        <Field name={name} {...rest}>
          {({ field }) => {
            return options.map((option) => {
              return (
                <React.Fragment key={option.key}>
                  <RadioLabel htmlFor={option.id}>
                    <input
                      type="radio"
                      id={option.id}
                      {...props}
                      {...field}
                      value={option.value}
                      checked={field.value === option.value}
                      style={{ marginRight: "6%" }}
                    />

                    {option.value}
                  </RadioLabel>
                </React.Fragment>
              );
            });
          }}
        </Field>
      </RadioInputContainer>
      {meta.touched && meta.error ? (
        <ErrorMsg>{meta.error}</ErrorMsg>
      ) : (
        <ErrorMsg style={{ visibility: "hidden" }}></ErrorMsg>
      )}
    </FieldContainer>
  );
};
