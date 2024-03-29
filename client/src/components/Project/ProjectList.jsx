import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getProfileSection } from "../../api/candidate";
import { Link } from "react-router-dom";
import Project from "./Project";
import ProjectModal from "./ProjectModal";

const ProjectList = ({ userID, isCandidatePage }) => {
  const [projectList, setProjectList] = useState([]);
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProfileSection(userID, "project");

      if (!result) {
        toast.error("Error getting projects");
        return;
      }

      setProjectList(result);
      setIsProfileChanged(false);
    };

    fetchData();
  }, [isProfileChanged]);

  return (
    <div>
      <p className="font-medium text-lg mb-2 flex justify-between items-center mt-8">
        <p>Projects</p>
        {isCandidatePage && (
          <>
            <label
              className="btn btn-success btn-outline"
              htmlFor="Add Project"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              {/* <Link to="/candidate/profile/add-project">Add New Project</Link> */}
              Add New Project
            </label>
            <ProjectModal
              type={"Add Project"}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              setIsProfileChanged={setIsProfileChanged}
            />
          </>
        )}
      </p>
      <div className="border-2 p-4 rounded-sm grid grid-cols-3 gap-4">
        {projectList.length !== 0 ? (
          projectList.map((project) => {
            return (
              <Project
                project={project}
                key={project._id}
                isCandidatePage={isCandidatePage}
                setIsProfileChanged={setIsProfileChanged}
              />
            );
          })
        ) : (
          <div>No Projects</div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
