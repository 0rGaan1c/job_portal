import React from "react";
import CandidateDetails from "../../../components/CandidateDetails";
import ProjectList from "../../../components/Project/ProjectList";
import ContentLayout from "../../../Layout/ContentLayout";

const index = () => {
  const userID = window.localStorage.getItem("userID");
  return (
    <ContentLayout>
      <h1 className="mb-2 font-medium text-xl">Your Profile</h1>
      <CandidateDetails isCandidatePage={true} userID={userID} />
      <ProjectList isCandidatePage={true} userID={userID} />
    </ContentLayout>
  );
};

export default index;
