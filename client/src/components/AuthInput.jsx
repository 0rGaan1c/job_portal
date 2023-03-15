import React from "react";
import InputLabel from "./InputLabel";

const AuthInput = ({ type, label, required, setInputText, minlength }) => {
  return (
    <div className="form-control my-2">
      <InputLabel label={label} color="white" />
      <input
        type={type}
        placeholder={label === "Skills *" ? "Ex: HTML, CSS, JAVA" : ""}
        required={required}
        className={`${label.includes("Password") ? "" : ""} register-input`}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        minLength={minlength}
      />
    </div>
  );
};

export default AuthInput;
