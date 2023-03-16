import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getProfileSection } from "../../api/candidate";
import Education from "./Education";
import EducationModal from "./EducationModal";

const EducationList = ({ userID, isCandidatePage }) => {
  const [educationList, setEducationList] = useState([]);
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProfileSection(userID, "education");

      if (!result) {
        toast.error("Error getting education");
        return;
      }

      setEducationList(result);
      setIsProfileChanged(false);
    };

    fetchData();
  }, [isProfileChanged]);

  return (
    <div>
      <p className="font-medium text-lg mb-2 flex justify-between items-center mt-8">
        <p>Education</p>
        {isCandidatePage && (
          <>
            <label
              className="btn btn-success btn-outline"
              htmlFor="Add Education"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Add New Education
            </label>
            <EducationModal
              type="Add Education"
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              setIsProfileChanged={setIsProfileChanged}
            />
          </>
        )}
      </p>
      <div className="border-2 p-4 rounded-sm grid grid-cols-3 gap-4">
        {educationList.length !== 0 ? (
          educationList.map((education) => {
            return (
              <Education
                education={education}
                key={education._id}
                isCandidatePage={isCandidatePage}
                setIsProfileChanged={setIsProfileChanged}
              />
            );
          })
        ) : (
          <div>No Educations</div>
        )}
      </div>
    </div>
  );
};

export default EducationList;
