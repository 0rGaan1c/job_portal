import React from "react";
import CandidateDetails from "../../../components/CandidateDetails";
import EducationList from "../../../components/Education/EducationList";
import ProjectList from "../../../components/Project/ProjectList";
import WorkList from "../../../components/Work/WorkList";
import ContentLayout from "../../../Layout/ContentLayout";

const index = () => {
  const userID = window.localStorage.getItem("userID");
  return (
    <ContentLayout>
      <h1 className="mb-2 font-medium text-xl">Your Profile</h1>
      <CandidateDetails isCandidatePage={true} userID={userID} />
      <WorkList userID={userID} isCandidatePage={true} />
      <ProjectList isCandidatePage={true} userID={userID} />
      <EducationList isCandidatePage={true} userID={userID} />
    </ContentLayout>
  );
};

export default index;
