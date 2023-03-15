import { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { createJob } from "../../../api/company/index";
import Input from "../../../components/Input";
import InputLabel from "../../../components/InputLabel";
import SelectJobRole from "../../../components/SelectJobRole";

const AddJobModal = ({ id, isModalOpen, setIsModalOpen }) => {
  const [skills, setSkills] = useState("");
  const [expRequired, setExpRequired] = useState("");
  const [compensation, setCompensation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRole, setJobRole] = useState([]);
  const [cookie, setCookie] = useCookies(["access_token"]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobRole) {
      toast.error("Please select a Job Role");
    }

    const formData = {
      skills,
      expRequired,
      compensation,
      jobDescription,
      jobRole,
      company: window.localStorage.getItem("userID"),
      token: cookie.access_token,
    };
    const result = await createJob(formData);

    if (!result) {
      toast.error("Error Creating Job");
      return;
    }

    toast.success("Job Created.");
    setIsModalOpen(false);
    e.target.reset();
  };

  return (
    <>
      <input
        type="checkbox"
        id={id}
        className="modal-toggle"
        checked={isModalOpen}
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <label
            htmlFor={id}
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            ✕
          </label>
          <form onSubmit={handleSubmit}>
            <div>
              <SelectJobRole setJobRole={setJobRole} textColor="black" />
              <Input
                type="text"
                label="Skills *"
                required={true}
                minlength={1}
                setInputText={setSkills}
              />
              <Input
                type="number"
                label="Compensation (per annum in INR) *"
                setInputText={setCompensation}
                required={true}
              />
              <Input
                type="number"
                label="Exp Required (in years) "
                setInputText={setExpRequired}
              />
              <div className="form-control mt-6">
                <InputLabel label={"Job Description *"} color="black" />
                <textarea
                  className="textarea textarea-bordered h-36 bg-transparent border-slate-500 w-full"
                  maxLength={200}
                  onChange={(e) => {
                    setJobDescription(e.target.value);
                  }}
                  required
                ></textarea>
              </div>
            </div>

            <div className="modal-action">
              <button
                // htmlFor={id}
                className="
            cursor-pointer btn btn-outline btn-success
            "
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddJobModal;
