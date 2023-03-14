import React from "react";

const JobStatus = ({ jobStatus }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full ${
          jobStatus === "Pending" ? "bg-gray-500" : ""
        }
              ${jobStatus === "Reviewing" ? "bg-yello-500" : ""}
              ${jobStatus === "Rejected" ? "bg-red-500" : ""}
              ${jobStatus === "Accepted" ? "bg-green-500" : ""}
              
              `}
      ></div>

      {jobStatus}
    </div>
  );
};

export default JobStatus;
