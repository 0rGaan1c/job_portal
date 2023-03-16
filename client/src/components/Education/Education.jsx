import React, { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { getDate } from "../../utils";
import DeleteModal from "../DeleteModal";
import EducationModal from "./EducationModal";

const Education = ({ education, isCandidatePage, setIsProfileChanged }) => {
  const { graduationType, degreeName, fromDate, toDate, _id } = education;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="border rounded-lg p-2 text-md">
      <div className="font-medium flex items-center justify-between">
        <p>
          {graduationType} • {degreeName}
        </p>
        {isCandidatePage && (
          <div className="flex gap-3">
            <label
              htmlFor={"Edit Education"}
              className="cursor-pointer"
              title={`Edit Education`}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <AiFillEdit />
            </label>
            <EducationModal
              type="Edit Education"
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              setIsProfileChanged={setIsProfileChanged}
              education={education}
            />
            <label
              htmlFor={_id}
              className="cursor-pointer"
              title={`Delete Education`}
            >
              <AiFillDelete />
            </label>
            <DeleteModal
              ID={_id}
              sectionType={"education"}
              setIsProfileChanged={setIsProfileChanged}
            />
          </div>
        )}
      </div>
      <div className="flex mt-4 gap-1">
        {fromDate ? <p>{getDate(fromDate)} - </p> : ""}
        {toDate ? <p>{getDate(toDate)}</p> : ""}
        {!toDate && fromDate ? <p> Present</p> : ""}
      </div>
    </div>
  );
};

export default Education;
