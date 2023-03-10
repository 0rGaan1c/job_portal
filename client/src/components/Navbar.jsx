import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between text-white  py-6 px-8">
      <div className="flex items-center gap-10 font-medium">
        <h1 className="font-bold text-xl">
          <Link to="/">(JOBS)</Link>
        </h1>
        <Link to="/register/candidate">Find a Developer Job</Link>
        <Link to="/register/company">Hire a Developer</Link>
      </div>

      <div className="flex gap-10">
        <button className="hover:text-slate-500">
          <Link to="/login">Log In</Link>
        </button>
        <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
          <button className="w-20 py-2 border-2 rounded-sm">
            <label tabIndex={0}>Sign Up</label>
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-sm w-52 text-black"
          >
            <li>
              <Link to="/register/candidate">For Candidate</Link>
            </li>
            <li>
              <Link to="/register/company">For Company</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
