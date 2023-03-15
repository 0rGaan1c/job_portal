import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getCandidateDetails } from "../api/candidate/index";
import Input from "./Input";
import { AiFillEdit } from "react-icons/ai";
import SelectJobRole from "./SelectJobRole";

const UserDetails = ({ isCandidatePage, isCompanyPage, userID }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCandidateDetails(userID);

      if (!result) {
        toast.error("Error getting details");
      }
      setUserDetails(result);
    };

    fetchData();
  }, []);

  return (
    <div className="border-2 p-4 rounded-sm">
      <div className="flex justify-between">
        <h1 className="font-medium text-lg">Details</h1>
        {isCandidatePage && (
          <button
            onClick={() => setIsDisabled(!isDisabled)}
            title="Edit Details"
          >
            <AiFillEdit className="w-6 h-6" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-4 gap-5">
        <Input
          value={userDetails?.email}
          type="email"
          label="Email *"
          required={true}
          isDisabled={true}
        />
        <Input
          value={userDetails?.name}
          type="text"
          label="Name *"
          required={true}
          isDisabled={isDisabled}
        />

        <Input
          value={userDetails?.skills}
          type="text"
          label="Skills *"
          required={true}
          isDisabled={isDisabled}
        />
        <SelectJobRole
          textColor="black"
          isDisabled={isDisabled}
          value={userDetails?.jobRole}
        />
      </div>
    </div>
  );
};

export default UserDetails;
