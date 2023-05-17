import React from "react";
import Frustrate from "../../assets/Frustrated.png";
import Sad from "../../assets/sad.png";
import Neutral from "../../assets/Neutral.png";
import Happy from "../../assets/Happy.png";
import VeryHappy from "../../assets/VeryHappy.png";
import { StyledLabel } from "../Styles";
import { Field } from "formik";
import styled from "styled-components";

export default function Moods(props) {
  const { label, name, value, setFieldValue,errors, touched, ...rest } = props;

  const options = [
    {
      id: 1,
      value: "Frustrated",
      src: Frustrate,
    },
    {
      id: 2,
      value: "Sad",
      src: Sad,
    },
    {
      id: 3,
      value: "Neutral",
      src: Neutral,
    },
    {
      id: 4,
      value: "Happy",
      src: Happy,
    },
    {
      id: 5,
      value: "Very Happy",
      src: VeryHappy,
    },
  ];

  return (
    <>
      <h2 style={{ textAlign: "center" }}>{label}</h2>
      <div
        className="moods"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "5%",
        }}
      >
        {options.map((option) => {
          return (
            <>
              <Field
                type="radio"
                name="employee_mood"
                className={
                  "mood-radio-button" +
                  (errors.message && touched.message ? " is-invalid" : "")
                }
                value={option.value}
                id={option.value}
                checked={value === option.value}
                onChange={() => setFieldValue("employee_mood", option.value)}
                style={{
                    opacity: "0",
                  position: "absolute",
                }}
              />
              <label className="mood" htmlFor={option.value}>
              <img className="mood-img" src={option.src} alt={option.value} />
              <p className="mood-label"> {option.value}</p>
            </label>
            </>
          );
        })}
      </div>
    </>
  );
}
