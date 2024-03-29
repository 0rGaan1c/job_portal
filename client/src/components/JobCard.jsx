import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import JobModal from "../components/JobModal";
import { getCompanyDetails } from "../api/company/index";
import { applyToJobs } from "../api/candidate/index";
import JobStatus from "./JobStatus";

const JobCard = ({ job, isAppliedPage, isBrowsePage }) => {
  const {
    company,
    compensation,
    expRequired,
    jobDescription,
    jobRole,
    skills,
    jobStatus,
    _id,
  } = job;
  const [companyDetail, setCompanyDetail] = useState("");
  const [cookie, setCookie] = useCookies(["access_token"]);
  const [isApplied, setIsApplied] = useState(false);

  const applyJob = async () => {
    const formData = {
      token: cookie.access_token,
      companyID: company,
      jobID: _id,
    };
    const result = await applyToJobs(formData);

    if (!result) {
      toast.error("Something went wrong.");
      return;
    }
    if (result.status === "error") {
      toast.error(result.error);
      return;
    }

    toast.success("You have applied to the job.");
    setIsApplied(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCompanyDetails(company);
      if (!result) {
        toast.error("Something went wrong");
        return;
      }

      setCompanyDetail(result);
    };

    fetchData();
  }, []);

  return (
    <div className="my-10 border-2 rounded-md px-4 py-6 w-11/12">
      <div className="flex items-center gap-4">
        <Avatar name={companyDetail?.companyName} size="60" round={8} />
        <div>
          <p className="font-medium text-lg">{companyDetail?.companyName}</p>
          <p>{companyDetail?.companyDescription}</p>
        </div>
      </div>

      <label htmlFor={`job-apply-modal-${_id}`} className="cursor-pointer">
        <div className="border-2 rounded-md mt-6 px-4 py-2 flex items-center justify-between">
          <p className="font-medium">
            {jobRole} |<span className="ml-2">₹ {compensation} LPA</span>
          </p>
          {isBrowsePage &&
            (!isApplied ? (
              <label
                htmlFor={`job-apply-modal-${_id}`}
                className="cursor-pointer btn btn-outline btn-success"
              >
                Apply
              </label>
            ) : (
              <label className="cursor-pointer btn btn-success text-white">
                Applied
              </label>
            ))}
          {isAppliedPage && <JobStatus jobStatus={jobStatus} />}
        </div>
      </label>
      <JobModal
        companyDetail={companyDetail}
        jobDescription={jobDescription}
        expRequired={expRequired}
        skills={skills}
        compensation={compensation}
        jobRole={jobRole}
        applyJob={applyJob}
        _id={_id}
        isBrowsePage={isBrowsePage}
        isAppliedPage={isAppliedPage}
        jobStatus={jobStatus}
      />
    </div>
  );
};

export default JobCard;
