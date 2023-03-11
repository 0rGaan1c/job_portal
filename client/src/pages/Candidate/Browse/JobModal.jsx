import React from "react";
import Avatar from "react-avatar";

const JobModal = ({
  companyDetail,
  jobDescription,
  expRequired,
  skills,
  jobRole,
  compensation,
  applyJob,
  _id,
}) => {
  return (
    <>
      <input
        type="checkbox"
        id={`job-apply-modal-${_id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-full max-w-5xl rounded-sm">
          <label
            htmlFor={`job-apply-modal-${_id}`}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex items-center gap-4">
            <Avatar name={companyDetail?.companyName} size="60" round={8} />
            <div>
              <p className="font-medium text-lg">
                {companyDetail?.companyName}
              </p>
              <p>{companyDetail?.companyDescription}</p>
            </div>
          </div>
          <div className="my-8">
            <h3 className="font-medium text-lg">About the job</h3>
            <p className="mt-2">{jobDescription}</p>
            <p className="mt-2">Experience Required: {expRequired} years.</p>
            <p className="mt-2">Skills: {skills}</p>
          </div>
          <div className="border rounded-md mt-6 px-4 py-2 flex items-center justify-between">
            <p className="font-medium">
              {jobRole} |<span className="ml-2">₹ {compensation} LPA</span>
            </p>
            <label
              htmlFor={`job-apply-modal-${_id}`}
              className="cursor-pointer btn btn-outline btn-success"
              onClick={applyJob}
            >
              Apply
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobModal;
