import React from "react";

const InputLabel = ({ label, color }) => {
  return (
    <label className="label">
      <span className={`label-text text-${color}`}>{label}</span>
    </label>
  );
};

export default InputLabel;
