import React, { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getDate } from "../../utils";
import DeleteModal from "../DeleteModal";
import WorkModal from "./WorkModal";

const Work = ({ work, isCandidatePage, setIsProfileChanged }) => {
  const { companyName, jobTitle, jobDescription, fromDate, toDate, _id } = work;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="border rounded-lg p-2 text-md">
      <div className="font-medium flex items-center justify-between">
        <p>
          {companyName} • {jobTitle}
        </p>
        {isCandidatePage && (
          <div className="flex gap-3">
            <label
              htmlFor={"Edit Work"}
              className="cursor-pointer"
              title={`Edit Work Exp`}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <AiFillEdit />
            </label>
            <WorkModal
              type="Edit Work"
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              setIsProfileChanged={setIsProfileChanged}
              work={work}
            />
            <label
              htmlFor={_id}
              className="cursor-pointer"
              title={`Delete Work Exp`}
            >
              <AiFillDelete />
            </label>
            <DeleteModal
              ID={_id}
              sectionType={"workexp"}
              setIsProfileChanged={setIsProfileChanged}
            />
          </div>
        )}
      </div>
      <p className="my-2">{jobDescription}</p>
      <div className="flex mt-4 gap-1">
        {fromDate ? <p>{getDate(fromDate)} - </p> : ""}
        {toDate ? <p>{getDate(toDate)}</p> : ""}
        {!toDate && fromDate ? <p> Present</p> : ""}
      </div>
    </div>
  );
};

export default Work;
