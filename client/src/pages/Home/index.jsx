import React, { useEffect, useState } from "react";
import { getAllJobs, getJobRoles } from "../../api/global";

const index = () => {
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setAllJobs(await getAllJobs());
    };
    fetchAPI();
  }, []);

  console.log(allJobs);
  return <div>Home</div>;
};

export default index;
