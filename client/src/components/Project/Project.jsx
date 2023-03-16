import React, { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import ProjectModal from "./ProjectModal";

const Project = ({ project, isCandidatePage, setIsProjectListChanged }) => {
  const {
    projectName,
    projectDescription,
    projectStack,
    projectCodeUrl,
    projectLiveUrl,
    _id,
  } = project;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const skills = projectStack.split(", ");

  return (
    <div className="border rounded-lg p-2 text-md">
      <h4 className="font-medium flex items-center justify-between">
        <p>{projectName}</p>
        {isCandidatePage && (
          <div className="flex gap-3">
            <label
              htmlFor={"Edit Project"}
              className="cursor-pointer"
              title={`Edit ${projectName}`}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <AiFillEdit />
            </label>
            <ProjectModal
              type="Edit Project"
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              setIsProjectListChanged={setIsProjectListChanged}
              project={project}
            />
            <label
              htmlFor={_id}
              className="cursor-pointer"
              title={`Delete ${projectName}`}
            >
              <AiFillDelete />
            </label>
            <DeleteModal
              projectID={_id}
              sectionType={"project"}
              setIsProjectListChanged={setIsProjectListChanged}
            />
          </div>
        )}
      </h4>
      <p className="my-2">{projectDescription}</p>
      <div className="flex gap-2 text-blue-500 underline my-4">
        {projectCodeUrl && <Link to={projectCodeUrl}>Code URL</Link>}
        {projectLiveUrl && <Link to={projectLiveUrl}>Live URL</Link>}
      </div>
      <div className="my-2 flex gap-2">
        {skills.length !== 0 ? (
          skills.map((skill, idx) => {
            return (
              <div key={idx} className="bg-gray-100 rounded-lg p-1">
                {skill}
              </div>
            );
          })
        ) : (
          <span className="font-medium">{projectStack}</span>
        )}
      </div>
    </div>
  );
};

export default Project;
