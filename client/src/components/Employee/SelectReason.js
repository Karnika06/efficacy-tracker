import { Field } from "formik";
import React from "react";
import styled from "styled-components";

const CheckboxWrapper = styled.label`
  display: flex;
  //   align-items: center;
  //   cursor: pointer;
  //   margin-bottom: 10px;

  input[type="checkbox"] {
    // display: none;
  }
`;

export default function SelectReason(props) {
  const { label, name, value, setFieldValue, ...rest } = props;

  const Checkbox = ({ name, value, checked, onChange, icon }) => {
    return (
      <>
        {/* <CheckboxWrapper> */}

        <label
          forHtml={name}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            margin: "1% 2%",
          }}
        >
          <Field
            name={name}
            className="mood-reasons-checkbox"
            type="checkbox"
            value={value}
            checked={checked}
            onChange={onChange}
            style={{
              opacity: "0",
              position: "absolute",
              cursor: "pointer",
            }}
          />

          <div name={name} className="reason-container" value={value}>
            {value}
          </div>
        </label>
        {/* </CheckboxWrapper> */}
      </>
    );
  };

  const CheckboxGroup = ({ options, value, onChange, name }) => {
    return (
      <>
        {options.map((option) => {
          return (
            <Checkbox
              key={option.value}
              name={name}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={(event) => {
                const newValue = value;

                if (event.target.checked) {
                  //   if (!value.includes(option.value)) {
                  newValue.push(option.value);
                  //   }
                } else {
                  newValue.splice(newValue.indexOf(option.value), 1);
                }
                {
                  console.log(newValue);
                }
                onChange(name, newValue);
              }}
            />
          );
        })}
      </>
    );
  };

  const reasons = [
    { id: 1, value: "Work Environment" },
    { id: 2, value: "Task area/Activity" },
    { id: 3, value: "Health" },
    { id: 4, value: "Career" },
    { id: 5, value: "Colleagues" },
    { id: 6, value: "Leadership" },
    { id: 7, value: "Payment" },
    { id: 8, value: "Tools" },
    { id: 9, value: "Training" },
    { id: 10, value: "Work Times" },
  ];

  return (
    <div>
      <h3 style={{ textAlign: "center", margin: "2% 0" }}>{label}</h3>
      <div className="reasons-container">
        <CheckboxGroup
          name="mood_reason"
          value={value}
          options={reasons}
          onChange={(fieldName, fieldValue) =>
            setFieldValue(fieldName, fieldValue)
          }
        />
      </div>
    </div>
  );
}
