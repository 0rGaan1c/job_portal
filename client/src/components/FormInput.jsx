import React from "react";
import RegisterFormLabel from "./RegisterFormLabel";

const FormInput = ({ type, label, required, setInputText, minlength }) => {
  return (
    <div className="form-control my-2">
      <RegisterFormLabel label={label} />
      <input
        type={type}
        placeholder={label === "Skills *" ? "Ex: HTML, CSS, JAVA" : ""}
        required={required}
        // className="register-input"
        className={`${label.includes("Password") ? "" : ""} register-input`}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        minLength={minlength}
      />
    </div>
  );
};

export default FormInput;
