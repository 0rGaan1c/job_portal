import React from "react";
import { Link, useLocation } from "react-router-dom";

const CandidateNav = () => {
  const currentPath = useLocation().pathname;

  return (
    <nav className="flex items-center text-black py-3 px-16 border-b-2 gap-16">
      <Link
        to="/candidate/browse"
        className={`${
          currentPath.includes("browse")
            ? "font-medium border-b-2 border-black"
            : ""
        } hover:font-medium`}
      >
        Browse
      </Link>
      <Link
        to="/candidate/applied"
        className={`${
          currentPath.includes("applied")
            ? "font-medium  border-b-2 border-black"
            : ""
        } hover:font-medium`}
      >
        Applied
      </Link>
      <Link
        to="/candidate/profile"
        className={`${
          currentPath.includes("profile")
            ? "font-medium border-b-2 border-black"
            : ""
        } hover:font-medium`}
      >
        Profile
      </Link>
    </nav>
  );
};

export default CandidateNav;
