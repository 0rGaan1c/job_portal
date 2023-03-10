import { useEffect, useState } from "react";
import { getJobRoles } from "../../../api/global";
import { Link } from "react-router-dom";
import FormInput from "../../../components/FormInput";
import RegisterFormLabel from "../../../components/RegisterFormLabel";
import toast from "react-hot-toast";
import { register } from "../../../api/auth";
import AuthLayout from "../../../Layout/AuthLayout";
import SubmitButton from "../../../components/SubmitButton";

const index = () => {
  const [jobRoles, setJobRoles] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setJobRoles(await getJobRoles());
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password doesn't match.");
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
          <div className="grid grid-cols-2 gap-2">
            <FormInput
              type="text"
              label="Name *"
              required={true}
              setInputText={setName}
            />
            <FormInput
              type="email"
              label="Email *"
              required={true}
              setInputText={setEmail}
            />
            <FormInput
              type="password"
              label="Password (Atleast 6 letters) *"
              minlength={6}
              required={true}
              setInputText={setPassword}
            />
            <FormInput
              type="password"
              label="Confirm Password *"
              required={true}
              setInputText={setConfirmPassword}
            />

            <div className="form-control my-2">
              <RegisterFormLabel label={"Select Job Role *"} />
              <select
                className="register-select"
                required
                onChange={(e) => {
                  setJobRole(e.target.value);
                }}
              >
                <option disabled selected>
                  Select Job Role
                </option>
                {jobRoles.map(({ jobRole, _id }) => {
                  return (
                    <option key={_id} className="text-black">
                      {jobRole}
                    </option>
                  );
                })}
              </select>
            </div>
            <FormInput
              type="text"
              label="Skills *"
              required={true}
              setInputText={setSkills}
            />
          </div>

          <div className="form-control my-2">
            <RegisterFormLabel label={"Your Bio"} />
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
