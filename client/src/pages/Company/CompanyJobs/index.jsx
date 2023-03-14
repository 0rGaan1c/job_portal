import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getAllCompanyJobs } from "../../../api/company/getAllCompanyJobs";
import { Link } from "react-router-dom";
import JobCard from "../../../components/JobCard";
import ContentLayout from "../../../Layout/ContentLayout";

const index = () => {
  const [companyJobs, setCompanyJobs] = useState([]);

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
  }, []);

  return (
    <ContentLayout>
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
        <div>You haven't added any jobs yet.</div>
      )}
    </ContentLayout>
  );
};

export default index;
