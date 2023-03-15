import React, { useEffect, useState } from "react";
import { getAllAppliedJobs } from "../../../api/candidate/index";
import JobCard from "../../../components/JobCard";
import ContentLayout from "../../../Layout/ContentLayout";

const index = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const result = await getAllAppliedJobs(
        window.localStorage.getItem("userID")
      );
      if (!result) {
        console.error("Error: Failed to fetch applied jobs.");
        return;
      }
      setAppliedJobs(result);
    };

    fetchAppliedJobs();
  }, []);

  return (
    <ContentLayout>
      {appliedJobs.length !== 0 ? (
        appliedJobs.map(({ job, jobStatus }) => {
          const jobsData = { ...job, jobStatus };
          return <JobCard key={job._id} job={jobsData} isAppliedPage={true} />;
        })
      ) : (
        <div>No Applied Jobs yet, Apply to a Job in the Browse section.</div>
      )}
    </ContentLayout>
  );
};

export default index;
