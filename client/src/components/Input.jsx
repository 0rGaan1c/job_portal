import React from "react";
import InputLabel from "./InputLabel";

const Input = ({
  type,
  label,
  required,
  setInputText,
  minlength,
  value,
  isDisabled,
}) => {
  return (
    <div className="form-control my-2">
      <InputLabel label={label} color="black" />
      <input
        type={type}
        placeholder={label === "Skills *" ? "Ex: HTML, CSS, JAVA" : ""}
        required={required}
        className={`${label.includes("Password") ? "" : ""} form-input`}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        minLength={minlength}
        value={value || ""}
        disabled={isDisabled}
      />
    </div>
  );
};

export default Input;
