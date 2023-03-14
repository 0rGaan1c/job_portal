import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { getCandidateDetails } from "../../../api/candidate/getCandidateDetails";
import { getAppliedUsers } from "../../../api/company/getAppliedUsers";
import { getJobByID } from "../../../api/global";
import ContentLayout from "../../../Layout/ContentLayout";
import { Link } from "react-router-dom";
import JobStatus from "../../../components/JobStatus";

const index = () => {
  const location = useLocation();
  const { id } = location.state;
  const [appliedUsers, setAppliedUsers] = useState([]);
  const [appliedUserList, setAppliedUserList] = useState([]);
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

  useEffect(() => {
    if (appliedUsers.length) {
      const fetchData = async () => {
        const list = [];
        for (let i = 0; i < appliedUsers.length; i++) {
          const result = await getCandidateDetails(appliedUsers[i].user);

          if (!result) {
            toast.error("Something went wrong");
            return;
          }
          const withStatus = {
            ...result,
            jobStatus: appliedUsers[i].jobStatus,
          };
          list.push(withStatus);
        }
        setAppliedUserList(list);
      };
      fetchData();
    }
  }, [appliedUsers]);

  return (
    <ContentLayout>
      <div className="">
        <p className="font-medium text-lg">{job.jobRole}</p>
        <div className="border p-4 rounded-sm">
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

      {appliedUserList.length !== 0 ? (
        <div className="my-8">
          <p className="font-medium">Applied Candidates</p>
          <div className="flex flex-wrap gap-5">
            {appliedUserList.map((user) => {
              return (
                <Link
                  to="/company/job/applied/user"
                  key={user._id}
                  className="w-[45%]"
                >
                  <div className="my-4 border rounded-sm p-2  cursor-pointer">
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
