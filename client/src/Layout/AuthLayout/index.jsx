import React from "react";
import { Link } from "react-router-dom";

const index = ({ children, textOne, textTwo }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col bg-black text-white">
      <h2 className="w-[60%] mx-auto py-2 text-xl font-medium">
        {textOne}{" "}
        <span className="text-base font-normal text-gray-700">{textTwo}</span>
      </h2>
      <div className="w-[60%] mx-auto h-[80vh] border-2 rounded-md p-4 border-white">
        {children}
      </div>
      <h2 className="w-[60%] mx-auto py-2 text-base">
        Already have an account?
        <span className="text-base font-normal text-green-500">
          <Link to="/login"> Login</Link>
        </span>{" "}
        <br />
        Or Go back to{" "}
        <span className="text-base font-normal text-green-500">
          <Link to="/">Home.</Link>
        </span>
      </h2>
    </div>
  );
};

export default index;
