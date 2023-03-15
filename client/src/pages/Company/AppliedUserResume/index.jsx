import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { changeJobStatus, getJobStatus } from "../../../api/company";
import { getJobByID } from "../../../api/global";
import InputLabel from "../../../components/InputLabel";
import JobStatus from "../../../components/JobStatus";
import UserDetails from "../../../components/UserDetails";
import ContentLayout from "../../../Layout/ContentLayout";

const index = () => {
  const location = useLocation();
  const { userID, jobID } = location.state;

  const [job, setJob] = useState([]);
  const [status, setStatus] = useState("");
  const [cookie, setCookie] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getJobByID(jobID);
      const currentJobStatus = await getJobStatus({
        userID,
        jobID,
        token: cookie.access_token,
      });

      if (!result || !currentJobStatus) {
        toast.error("Error getting job.");
        return;
      }
      setJob(result);
      setStatus(currentJobStatus.jobStatus);
    };

    fetchData();
  }, []);

  const handleChangeJobStatus = async () => {
    if (!status || status === "Pending") {
      toast.error("Cannot change the job status to Pending.");
      return;
    }

    const formData = {
      token: cookie.access_token,
      jobStatus: status,
      userID,
      jobID,
    };

    const result = await changeJobStatus(formData);

    if (!result) {
      toast.error("Error changing job status.");
      return;
    }

    toast.success("Job Status changed.");
  };

  return (
    <ContentLayout>
      <div className="mb-4">
        <p className="font-medium text-xl mb-4">{job.jobRole}</p>
        <div className="border-2 p-4 rounded-sm flex">
          <div className="w-[50%]">
            <p className="font-medium">Description</p>
            <p className="mb-4">{job.jobDescription}</p>
            <p>
              <span className="font-medium">Salary</span>: ₹ {job.compensation}{" "}
              LPA
            </p>
            <p>
              <span className="font-medium">Experience Required</span>:{" "}
              {job.expRequired} years
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="font-medium">Current Job Status:</span>{" "}
              <JobStatus jobStatus={status} />
            </div>
          </div>

          <div className="form-control  w-[50%]">
            <InputLabel label={"Change Job Status *"} color={"black"} />
            <select
              className="black-select"
              required
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option disabled selected>
                {status}
              </option>
              {["Reviewing", "Rejected", "Accepted"].map((val, idx) => {
                return (
                  <option key={idx} className="text-black">
                    {val}
                  </option>
                );
              })}
            </select>
            <button
              className="btn btn-outline btn-success mt-4 w-[30%] ml-auto"
              onClick={handleChangeJobStatus}
            >
              Change
            </button>
          </div>
        </div>
      </div>
      <p className="font-medium mt-6 text-lg mb-2">Candiate's Resume</p>
      <UserDetails isCompanyPage={true} userID={userID} />
    </ContentLayout>
  );
};

export default index;
