import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  getCandidateDetails,
  updateCandidateDetails,
} from "../api/candidate/index";
import Input from "./Input";
import { AiFillEdit } from "react-icons/ai";
import SelectJobRole from "./SelectJobRole";
import { useCookies } from "react-cookie";
import InputLabel from "./InputLabel";

const CandidateDetails = ({ isCandidatePage, isCompanyPage, userID }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [bio, setBio] = useState("");
  const [cookie, setCookie] = useCookies(["access_token"]);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCandidateDetails(userID);

      if (!result) {
        toast.error("Error getting details");
        return;
      }
      setEmail(result.email);
      setName(result.name);
      setSkills(result.skills);
      setJobRole(result.jobRole);
      setBio(result.bio);
      setIsUserLoaded(true);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobRole) {
      toast.error("Please select a Job Role.");
      return;
    }

    const result = await updateCandidateDetails({
      token: cookie.access_token,
      name,
      skills,
      jobRole,
      bio,
    });

    if (!result) {
      toast.error("Error Updating Candidate details");
      return;
    }

    toast.success("Details Updated Successfully");
    setIsDisabled(true);
  };

  return (
    <>
      {isUserLoaded && (
        <div className="border-2 p-4 rounded-sm mb-6">
          <div className="flex justify-end">
            {/* <h1 className="font-medium text-lg">Details</h1> */}
            {isCandidatePage && (
              <button
                onClick={() => setIsDisabled(!isDisabled)}
                title="Edit Details"
              >
                <AiFillEdit className="w-6 h-6" />
              </button>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-5">
              <Input
                value={email}
                type="email"
                label="Email *"
                required={true}
                isDisabled={true}
              />
              <Input
                value={name}
                type="text"
                label="Name *"
                required={true}
                setInputText={setName}
                isDisabled={isDisabled}
              />

              <Input
                value={skills}
                type="text"
                label="Skills *"
                required={true}
                setInputText={setSkills}
                isDisabled={isDisabled}
              />
              <SelectJobRole
                textColor="black"
                isDisabled={isDisabled}
                setJobRole={setJobRole}
                value={jobRole}
              />
            </div>
            {isCandidatePage && (
              <div className="form-control my-2">
                <InputLabel label={"Your Bio"} color="black" />
                <textarea
                  className="textarea textarea-bordered h-28 bg-transparent border-slate-500 w-full"
                  placeholder="Bio"
                  maxLength={200}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                  value={bio}
                  disabled={isDisabled}
                ></textarea>
              </div>
            )}
            {isCandidatePage && (
              <div className="w-full flex justify-end mt-4">
                <button
                  className="btn btn-outline btn-success"
                  disabled={isDisabled}
                >
                  Update
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default CandidateDetails;
