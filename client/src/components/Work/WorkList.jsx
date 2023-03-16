import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getProfileSection } from "../../api/candidate";
import Work from "./Work";
import WorkModal from "./WorkModal";

const WorkList = ({ userID, isCandidatePage }) => {
  const [workList, setWorkList] = useState([]);
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProfileSection(userID, "workexp");

      if (!result) {
        toast.error("Error getting work");
        return;
      }

      setWorkList(result);
      setIsProfileChanged(false);
    };

    fetchData();
  }, [isProfileChanged]);

  return (
    <div>
      <p className="font-medium text-lg mb-2 flex justify-between items-center mt-8">
        <p>Work Experience</p>
        {isCandidatePage && (
          <>
            <label
              className="btn btn-success btn-outline"
              htmlFor="Add Work"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Add New Work
            </label>
            <WorkModal
              type="Add Work"
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              setIsProfileChanged={setIsProfileChanged}
            />
          </>
        )}
      </p>
      <div className="border-2 p-4 rounded-sm grid grid-cols-3 gap-4">
        {workList.length !== 0 ? (
          workList.map((work) => {
            return (
              <Work
                work={work}
                key={work._id}
                isCandidatePage={isCandidatePage}
                setIsProfileChanged={setIsProfileChanged}
              />
            );
          })
        ) : (
          <div>No Work Experience</div>
        )}
      </div>
    </div>
  );
};

export default WorkList;
