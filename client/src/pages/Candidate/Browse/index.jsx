import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getAllJobs } from "../../../api/global";
import JobCard from "./JobCard";

const index = () => {
  const [allJobs, setAllJobs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllJobs();
      if (!result) {
        toast.error("Something went wrong.");
        return;
      }
      setAllJobs(result);
    };

    fetchData();
  }, []);

  return (
    <div className="w-11/12 mx-auto mt-10">
      {allJobs.map((job) => {
        return <JobCard key={job._id} job={job} />;
      })}
    </div>
  );
};

export default index;
