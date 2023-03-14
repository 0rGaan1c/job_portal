import React, { useEffect, useState } from "react";
import { getAllAppliedJobs } from "../../../api/candidate/getAllAppliedJobs";
import { getAllJobs } from "../../../api/global";
import JobCard from "../../../components/JobCard";
import ContentLayout from "../../../Layout/ContentLayout";

const index = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [appliedJobsData, setAppliedJobsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllAppliedJobs(
        window.localStorage.getItem("userID")
      );
      if (!result) {
        toast.error("Something went wrong.");
        return;
      }
      setAppliedJobs(result);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (appliedJobs.length) {
      const fetchData = async () => {
        const result = await getAllJobs();
        if (!result) {
          toast.error("Something went wrong.");
          return;
        }
        const filterApplyJobs = [];
        for (let j = 0; j < result.length; j++) {
          for (let i = 0; i < appliedJobs.length; i++) {
            if (appliedJobs[i].job === result[j]._id) {
              filterApplyJobs.push({
                ...result[i],
                jobStatus: appliedJobs[i].jobStatus,
              });
            }
          }
        }
        setAppliedJobsData(filterApplyJobs);
      };
      fetchData();
    }
  }, [appliedJobs]);

  return (
    <ContentLayout>
      {appliedJobsData.length !== 0 ? (
        appliedJobsData.map((job) => {
          return <JobCard key={job._id} job={job} isAppliedPage={true} />;
        })
      ) : (
        <div>No Applied Jobs yet, Apply to a Job in the Browse section.</div>
      )}
    </ContentLayout>
  );
};

export default index;
