import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { createProfileSection, editProfileSection } from "../../api/candidate";
import Input from "../Input";

const WorkModal = ({
  type,
  isModalOpen,
  setIsModalOpen,
  setIsProfileChanged,
  work,
}) => {
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState();
  const [workID, setWorkID] = useState("");
  const [cookie, setCookie] = useCookies(["access_token"]);

  useEffect(() => {
    if (isModalOpen && work && type === "Edit Work") {
      const { companyName, jobTitle, jobDescription, fromDate, toDate, _id } =
        work;

      setCompanyName(companyName);
      setJobDescription(jobDescription);
      setJobTitle(jobTitle);
      setFromDate(fromDate);
      setToDate(toDate);
      setWorkID(_id);
    }
  }, [work, isModalOpen]);

  const addNewWork = async (e) => {
    e.preventDefault();
    const formData = {
      token: cookie.access_token,
      companyName,
      jobDescription,
      jobTitle,
      fromDate,
      toDate,
    };
    console.log(formData);
    if (type === "Add Work") {
      const result = await createProfileSection("workexp", formData);

      if (!result) {
        toast.error("Error Creating Work Exp");
        return;
      }

      toast.success("Work Exp Created");
      setIsProfileChanged(true);
    }
    if (type === "Edit Work") {
      const result = await editProfileSection("workexp", {
        ...formData,
        workID,
      });
      if (!result) {
        toast.error("Error Updating Work Exp");
        return;
      }
      toast.success("Work Exp Updated");
      setIsProfileChanged(true);
    }

    setIsModalOpen(false);
    setCompanyName("");
    setJobDescription("");
    setJobTitle("");
    setFromDate("");
    setToDate("");
    e.target.reset();
  };

  return (
    <>
      <input
        type="checkbox"
        id={type}
        className="modal-toggle"
        checked={isModalOpen}
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <label
            htmlFor={type}
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">{type}</h3>

          <form onSubmit={addNewWork}>
            <Input
              type="text"
              label={"Company Name *"}
              required={true}
              setInputText={setCompanyName}
              value={companyName}
            />
            <Input
              type="text"
              label={"Job Description *"}
              required={true}
              setInputText={setJobDescription}
              value={jobDescription}
            />
            <Input
              type="text"
              label={"Job Title *"}
              required={true}
              setInputText={setJobTitle}
              value={jobTitle}
            />
            <Input
              type="date"
              label={"From Date *"}
              setInputText={setFromDate}
              required={true}
            />
            <Input type="date" label={"To Date "} setInputText={setToDate} />

            <div className="modal-action">
              <button className="btn btn-success  btn-outline">{type}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WorkModal;
