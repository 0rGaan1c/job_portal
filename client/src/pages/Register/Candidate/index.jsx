import { useEffect, useState } from "react";
import { getJobRoles } from "../../../api/global";
import { Link } from "react-router-dom";
import AuthInput from "../../../components/AuthInput";
import InputLabel from "../../../components/InputLabel";
import toast from "react-hot-toast";
import { register } from "../../../api/auth";
import AuthLayout from "../../../Layout/AuthLayout";
import SubmitButton from "../../../components/SubmitButton";
import SelectJobRole from "../../../components/SelectJobRole";

const index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [jobRoles, setJobRoles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password doesn't match.");
      return;
    }
    if (email === contactEmail) {
      toast.error("Email & Contact Email should be different.");
      return;
    }
    if (!jobRole) {
      toast.error("Please Select a Job Role.");
      return;
    }

    setIsLoading(true);
    const formData = {
      name,
      email,
      contactEmail,
      password,
      role: "user",
      jobRole,
      skills,
      bio,
    };
    const result = await register(formData);
    if (result !== "ok") {
      toast.error(result);
      setIsLoading(false);
      return;
    } else {
      setIsLoading(false);
      setIsAccountCreated(true);
      toast.success("Account created.");
    }
  };

  return (
    <AuthLayout textOne={"Sign Up"} textTwo={"and start applying for jobs..."}>
      {isAccountCreated ? (
        <div className="flex justify-center items-center flex-col h-full gap-5">
          <p>Your candidate account is ready. You can now Log In.</p>
          <button className="btn btn-success bg-green-500 text-white">
            <Link to="/login">Log In</Link>
          </button>
          <p>
            <span
              onClick={() => {
                setIsAccountCreated(false);
              }}
              className="text-green-500 cursor-pointer"
            >
              Click here
            </span>{" "}
            to create another account?
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-2">
            <AuthInput
              type="text"
              label="Name *"
              required={true}
              setInputText={setName}
            />
            <AuthInput
              type="email"
              label="Email *"
              required={true}
              setInputText={setEmail}
            />
            <AuthInput
              type="email"
              label="Contact Email *"
              required={true}
              setInputText={setContactEmail}
            />
            <AuthInput
              type="password"
              label="Password (Atleast 6 letters) *"
              minlength={6}
              required={true}
              setInputText={setPassword}
            />
            <AuthInput
              type="password"
              label="Confirm Password *"
              required={true}
              setInputText={setConfirmPassword}
            />
            <SelectJobRole setJobRole={setJobRole} textColor="white" />
            <AuthInput
              type="text"
              label="Skills *"
              required={true}
              setInputText={setSkills}
            />
          </div>

          <div className="form-control my-2">
            <InputLabel label={"Your Bio"} color="white" />
            <textarea
              className="textarea textarea-bordered h-32 bg-transparent border-slate-500"
              placeholder="Bio"
              maxLength={200}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="w-full flex justify-end mt-7">
            <SubmitButton label={"Sign Up"} isLoading={isLoading} />
          </div>
        </form>
      )}
    </AuthLayout>
  );
};

export default index;
