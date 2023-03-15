import React from "react";
import Loader from "../assets/loader.svg";

const SubmitButton = ({ label, isLoading }) => {
  return (
    <button className="btn btn-success btn-outline text-white ">
      {isLoading ? (
        <img src={Loader} alt="" style={{ width: "50px", height: "40px" }} />
      ) : (
        label
      )}
    </button>
  );
};

export default SubmitButton;
