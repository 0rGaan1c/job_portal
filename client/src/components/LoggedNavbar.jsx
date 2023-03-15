import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Avatar from "react-avatar";
import { getCandidateDetails } from "../api/candidate/index";
import { getCompanyDetails } from "../api/company/index";
import { toast } from "react-hot-toast";

const LoggedNavbar = () => {
  const [_, setCookie] = useCookies(["access_token"]);
  const [name, setName] = useState("");
  const { role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userID = window.localStorage.getItem("userID");
    const fetchData = async () => {
      if (role === "user") {
        const result = await getCandidateDetails(userID);
        if (!result) {
          toast.error("Something went wrong.");
          return;
        }
        setName(result.name);
      } else {
        const result = await getCompanyDetails(userID);
        if (!result) {
          toast.error("Something went wrong.");
          return;
        }
        setName(result.companyName);
      }
    };

    fetchData();
  }, []);

  const logOut = () => {
    setCookie("access_token", "", { path: "/" });
    window.localStorage.removeItem("userID");
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between text-black py-3 shadow-sm px-16 border-b">
      <div className="flex items-center gap-10 font-medium">
        <h1 className="font-bold text-xl">(JOBS)</h1>
      </div>

      <div className="flex gap-10">
        <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
          <button className="w-32 p-2 border-2 rounded-lg flex items-center gap-4 justify-between">
            <label tabIndex={0} className="hover:cursor-pointer">
              Account
            </label>
            <Avatar name={name} size="30" round={true} />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-sm w-52 text-black"
          >
            <li>
              <Link to="/register/candidate">Profile</Link>
            </li>
            <li onClick={logOut}>
              <p>Log Out</p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default LoggedNavbar;
