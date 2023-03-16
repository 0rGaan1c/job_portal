import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { createProfileSection, editProfileSection } from "../../api/candidate";
import Input from "../Input";

const EducationModal = ({
  type,
  isModalOpen,
  setIsModalOpen,
  setIsProfileChanged,
  education,
}) => {
  const [graduationType, setGraduationType] = useState("");
  const [degreeName, setDegreeName] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState();
  const [educationID, setEducationID] = useState("");
  const [cookie, setCookie] = useCookies(["access_token"]);

  useEffect(() => {
    if (isModalOpen && education && type === "Edit Education") {
      const { graduationType, degreeName, fromDate, toDate, _id } = education;

      setGraduationType(graduationType);
      setDegreeName(degreeName);
      setFromDate(fromDate);
      setToDate(toDate);
      setEducationID(_id);
    }
  }, [education, isModalOpen]);

  const addNewEducation = async (e) => {
    e.preventDefault();
    const formData = {
      token: cookie.access_token,
      graduationType,
      degreeName,
      fromDate,
      toDate,
    };
    if (type === "Add Education") {
      const result = await createProfileSection("education", formData);

      if (!result) {
        toast.error("Error Creating Education");
        return;
      }

      toast.success("Education Created");
      setIsProfileChanged(true);
    }
    if (type === "Edit Education") {
      const result = await editProfileSection("education", {
        ...formData,
        educationID,
      });
      if (!result) {
        toast.error("Error Updating Education");
        return;
      }
      toast.success("Education Updated");
      setIsProfileChanged(true);
    }

    setIsModalOpen(false);
    setGraduationType("");
    setDegreeName("");
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

          <form onSubmit={addNewEducation}>
            <Input
              type="text"
              label={"Graudation Type (PG, UG, etc) *"}
              required={true}
              setInputText={setGraduationType}
              value={graduationType}
            />
            <Input
              type="text"
              label={"Degree Name *"}
              required={true}
              setInputText={setDegreeName}
              value={degreeName}
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

export default EducationModal;
