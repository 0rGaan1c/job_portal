import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { deleteProfileSection } from "../api/candidate";

const DeleteModal = ({ projectID, sectionType, setIsProjectListChanged }) => {
  const [cookie, setCookie] = useCookies(["access_token"]);

  const handleDelete = async () => {
    const result = await deleteProfileSection(sectionType, {
      token: cookie.access_token,
      projectID,
    });

    if (!result) {
      toast.error("Error deleting project");
      return;
    }

    toast.success("Project Deleted!");
    setIsProjectListChanged(true);
  };

  return (
    <>
      <input type="checkbox" id={projectID} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label
            htmlFor={projectID}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">
            Delete <span className="capitalize">{sectionType}</span>
          </h3>
          <p className="py-4">
            Once deleted, you won't be able to get it back!
          </p>
          <div className="modal-action" onClick={handleDelete}>
            <label htmlFor={projectID} className="btn btn-error text-white">
              Delete
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
