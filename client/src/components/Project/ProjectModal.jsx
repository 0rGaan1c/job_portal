import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { createProfileSection, editProfileSection } from "../../api/candidate";
import Input from "../Input";

const ProjectModal = ({
  type,
  isModalOpen,
  setIsModalOpen,
  setIsProfileChanged,
  project,
}) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStack, setProjectStack] = useState("");
  const [projectCodeUrl, setProjectCodeUrl] = useState("");
  const [projectLiveUrl, setProjectLiveUrl] = useState("");
  const [projectID, setProjectID] = useState("");
  const [cookie, setCookie] = useCookies(["access_token"]);

  useEffect(() => {
    if (isModalOpen && project && type === "Edit Project") {
      const {
        projectName,
        projectDescription,
        projectStack,
        projectCodeUrl,
        projectLiveUrl,
        _id,
      } = project;

      setProjectName(projectName);
      setProjectDescription(projectDescription);
      setProjectStack(projectStack);
      setProjectLiveUrl(projectLiveUrl);
      setProjectCodeUrl(projectCodeUrl);
      setProjectID(_id);
    }
  }, [project, isModalOpen]);

  const addNewProject = async (e) => {
    e.preventDefault();
    const formData = {
      token: cookie.access_token,
      projectName,
      projectDescription,
      projectStack,
      projectLiveUrl,
      projectCodeUrl,
    };
    if (type === "Add Project") {
      const result = await createProfileSection("project", formData);

      if (!result) {
        toast.error("Error Creating Project");
        return;
      }

      toast.success("Project Created");
      setIsProfileChanged(true);
    }
    if (type === "Edit Project") {
      const result = await editProfileSection("project", {
        ...formData,
        projectID,
      });
      if (!result) {
        toast.error("Error Creating Project");
        return;
      }
      toast.success("Project Updated");
      setIsProfileChanged(true);
    }

    setIsModalOpen(false);
    setProjectName("");
    setProjectDescription("");
    setProjectStack("");
    setProjectLiveUrl("");
    setProjectCodeUrl("");
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

          <form onSubmit={addNewProject}>
            <Input
              type="text"
              label={"Project Name *"}
              required={true}
              setInputText={setProjectName}
              value={projectName}
            />
            <Input
              type="text"
              label={"Project Description *"}
              required={true}
              setInputText={setProjectDescription}
              value={projectDescription}
            />
            <Input
              type="text"
              label={"Project Stack *"}
              required={true}
              setInputText={setProjectStack}
              value={projectStack}
            />
            <Input
              type="text"
              label={"Project Code URL"}
              setInputText={setProjectCodeUrl}
              value={projectCodeUrl}
            />
            <Input
              type="text"
              label={"Project Live URL"}
              setInputText={setProjectLiveUrl}
              value={projectLiveUrl}
            />

            <div className="modal-action">
              <button className="btn btn-success  btn-outline">{type}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;
