import React from "react";
import UserDetails from "../../../components/UserDetails";
import ContentLayout from "../../../Layout/ContentLayout";

const index = () => {
  return (
    <ContentLayout>
      <div className="">
        <UserDetails
          isCandidatePage={true}
          userID={window.localStorage.getItem("userID")}
        />
      </div>
    </ContentLayout>
  );
};

export default index;
