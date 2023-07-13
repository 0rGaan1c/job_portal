import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { getAllAppliedJobs } from "../../../api/candidate/index";
import { getAllJobs } from "../../../api/global";
import JobCard from "../../../components/JobCard";
import SearchBox from "../../../components/SearchBox";
import ContentLayout from "../../../Layout/ContentLayout";
import Fuse from "fuse.js";

const index = () => {
  const [appliedJobsID, setAppliedJobsID] = useState([]);
  const [unappliedJobs, setUnappliedJobs] = useState([]);
  const [unappliedJobsToShow, setUnappliedJobsToShow] = useState([]);
  const firstRender = useRef(true);

  const fuse = new Fuse(unappliedJobs, {
    keys: ["jobRole", "skills"],
    includeScore: true,
  });

  const onSearchTextChange = (searchText) => {
    const results = fuse.search(searchText);
    console.log(results);
    const unAppliedJobAfterSearch = searchText
      ? results.map((result) => result.item)
      : unappliedJobs;
    setUnappliedJobsToShow(unAppliedJobAfterSearch);
  };

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
      firstRender.current = false;
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (firstRender.current) return;

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
      setUnappliedJobsToShow(filterUnapplyJobs);
    };
    fetchData();
  }, [appliedJobsID]);

  return (
    <ContentLayout>
      <div className="flex justify-between">
        <h1 className="-mb-4 font-medium text-xl">
          Browse and Apply to Jobs...
        </h1>
        <SearchBox onSearchTextChange={onSearchTextChange} />
      </div>
      {unappliedJobsToShow.length !== 0 ? (
        unappliedJobsToShow.map((job) => {
          return <JobCard key={job._id} job={job} isBrowsePage={true} />;
        })
      ) : (
        <div>No Jobs yet. Please try again...</div>
      )}
    </ContentLayout>
  );
};

export default index;
