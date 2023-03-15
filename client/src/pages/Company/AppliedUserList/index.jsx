import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { getAppliedUsers } from "../../../api/company/index";
import { getJobByID } from "../../../api/global";
import ContentLayout from "../../../Layout/ContentLayout";
import { Link } from "react-router-dom";
import JobStatus from "../../../components/JobStatus";

const index = () => {
  const location = useLocation();
  const { id } = location.state;
  const [appliedUsers, setAppliedUsers] = useState([]);
  const [job, setJob] = useState([]);
  const [cookie] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getJobByID(id);
      const result2 = await getAppliedUsers(cookie.access_token, id);

      if (!result || !result2) {
        toast.error("Something went wrong");
        return;
      }
      setJob(result);
      setAppliedUsers(result2);
    };

    fetchData();
  }, []);

  return (
    <ContentLayout>
      <div className="">
        <p className="font-medium text-xl mb-4">{job.jobRole}</p>
        <div className="border-2 p-4 rounded-sm">
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
        </div>
      </div>

      {appliedUsers.length !== 0 ? (
        <div className="my-8">
          <p className="font-medium">Applied Candidates</p>
          <div className="flex flex-wrap gap-5">
            {appliedUsers.map(({ user }) => {
              return (
                <Link
                  to="/company/job/applied/user"
                  key={user._id}
                  className="w-[45%]"
                  state={{ userID: user._id, jobID: job._id }}
                >
                  <div className="my-4 border-2 rounded-sm p-2  cursor-pointer">
                    <div className="flex gap-5 items-center">
                      <Avatar name={user.name} size="40" round={8} />
                      <p>{user.name}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="ml-16">{user.jobRole}</p>
                      <JobStatus jobStatus={user.jobStatus} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="my-8 font-medium">
          No one has applied to this job yet.
        </div>
      )}
    </ContentLayout>
  );
};

export default index;
