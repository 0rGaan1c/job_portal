import React, { useEffect, useState } from "react";
import { getAllJobs } from "../../api/global";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useCookies } from "react-cookie";

const index = () => {
  return (
    <>
      <Navbar />
      <div className="bg-black w-full h-screen bg-cover absolute top-0 z-[-1]">
        <h2 className="h-screen flex justify-center items-center flex-col text-white text-4xl w-[70%] mx-auto text-center -mt-12 leading-relaxed">
          <p>Easily create your profile and apply to Developer Jobs. </p>
          <p>Or Post Jobs and hire suitable candidates.</p>
          <div className="text-base mt-8 flex gap-10">
            <button className="w-40 bg-white text-black font-medium rounded-sm py-2">
              <Link to="/register/candidate">Find Jobs</Link>
            </button>
            <button className="w-40 border-2 font-medium rounded-sm py-2">
              <Link to="/register/company">Hire Developers</Link>
            </button>
          </div>
        </h2>
      </div>
    </>
  );
};

export default index;
