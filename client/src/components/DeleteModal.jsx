import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { deleteProfileSection } from "../api/candidate";

const DeleteModal = ({ ID, sectionType, setIsProfileChanged }) => {
  const [cookie, setCookie] = useCookies(["access_token"]);

  const handleDelete = async () => {
    const formData = {
      token: cookie.access_token,
    };

    if (sectionType === "project") {
      formData.projectID = ID;
    }
    if (sectionType === "workexp") {
      formData.workID = ID;
    }
    if (sectionType === "education") {
      formData.educationID = ID;
    }

    const result = await deleteProfileSection(sectionType, formData);

    if (!result) {
      toast.error("Error deleting " + sectionType);
      return;
    }

    toast.success(sectionType + " Deleted!");
    setIsProfileChanged(true);
  };

  return (
    <>
      <input type="checkbox" id={ID} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label
            htmlFor={ID}
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
            <label htmlFor={ID} className="btn btn-error text-white">
              Delete
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
