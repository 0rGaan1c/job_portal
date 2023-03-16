import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getAllCompanyJobs } from "../../../api/company/index";
import { Link } from "react-router-dom";
import JobCard from "../../../components/JobCard";
import ContentLayout from "../../../Layout/ContentLayout";
import AddJobModal from "./AddJobModal";

const index = () => {
  const [companyJobs, setCompanyJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllCompanyJobs(
        window.localStorage.getItem("userID")
      );

      if (!result) {
        toast.error("Something went wrong.");
        return;
      }

      setCompanyJobs(result);
    };

    fetchData();
  }, [isModalOpen]);

  return (
    <ContentLayout>
      <div className="mb-4 flex justify-end">
        <label
          className="btn btn-success text-white"
          htmlFor="add-job"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Job
        </label>
      </div>
      <h1 className="-mb-6 font-medium text-xl">Your Jobs...</h1>
      {companyJobs.length !== 0 ? (
        companyJobs.map((job) => {
          return (
            <Link
              to={`/company/job/applied`}
              state={{ id: job._id }}
              key={job._id}
            >
              <JobCard job={job} isCompanyPage={true} />
            </Link>
          );
        })
      ) : (
        <div className="mt-8">You haven't added any jobs yet.</div>
      )}
      <AddJobModal
        id={"add-job"}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </ContentLayout>
  );
};

export default index;
