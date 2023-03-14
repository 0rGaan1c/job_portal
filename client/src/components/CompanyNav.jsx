import React from "react";
import { Link, useLocation } from "react-router-dom";

const CompanyNav = () => {
  const currentPath = useLocation().pathname;

  return (
    <nav className="flex items-center text-black py-3 px-16 border-b-2 gap-16">
      <Link
        to="/company/job"
        className={`${
          currentPath.includes("job") && !currentPath.includes("applied")
            ? "font-medium border-b-2 border-black"
            : ""
        } hover:font-medium`}
      >
        Jobs
      </Link>
      <Link
        to="/company/p"
        className={`${
          currentPath.includes("job/applied")
            ? "font-medium  border-b-2 border-black"
            : ""
        } hover:font-medium`}
      >
        Applied
      </Link>
      <Link
        to="/company/profile"
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

export default CompanyNav;
