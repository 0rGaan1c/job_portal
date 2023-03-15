import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getAllAppliedJobs } from "../../../api/candidate/index";
import { getAllJobs } from "../../../api/global";
import JobCard from "../../../components/JobCard";
import ContentLayout from "../../../Layout/ContentLayout";

const index = () => {
  const [appliedJobsID, setAppliedJobsID] = useState([]);
  const [unappliedJobs, setUnappliedJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllAppliedJobs(
        window.localStorage.getItem("userID")
      );
      if (!result) {
        toast.error("Something went wrong.");
        return;
      }
      const jobsIDs = result.map((res) => {
        return res.job._id;
      });
      setAppliedJobsID(jobsIDs);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllJobs();
      if (!result) {
        toast.error("Something went wrong.");
        return;
      }
      const filterUnapplyJobs = result.filter((res) => {
        if (!appliedJobsID.includes(res._id)) {
          return res;
        }
      });
      setUnappliedJobs(filterUnapplyJobs);
    };
    fetchData();
  }, [appliedJobsID]);

  return (
    <ContentLayout>
      {unappliedJobs.length !== 0 ? (
        unappliedJobs.map((job) => {
          return <JobCard key={job._id} job={job} isBrowsePage={true} />;
        })
      ) : (
        <div>No Jobs yet. Please try again...</div>
      )}
    </ContentLayout>
  );
};

export default index;
