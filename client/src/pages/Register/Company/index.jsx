import React, { useState } from "react";
import AuthLayout from "../../../Layout/AuthLayout";
import RegisterFormLabel from "../../../components/RegisterFormLabel";
import FormInput from "../../../components/FormInput";
import SubmitButton from "../../../components/SubmitButton";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { register } from "../../../api/auth";

const index = () => {
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(companyName, email, password, companyDescription);
    if (password !== confirmPassword) {
      toast.error("Password doesn't match.");
      return;
    }

    setIsLoading(true);
    const formData = {
      email,
      password,
      role: "company",
      companyName,
      companyDescription,
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
    <AuthLayout textOne={"Sign Up"} textTwo={"and hire developers..."}>
      {isAccountCreated ? (
        <div className="flex justify-center items-center flex-col h-full gap-5">
          <p>Your company account is ready. You can now Log In.</p>
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
              label="Company Name *"
              required={true}
              setInputText={setCompanyName}
            />
            <FormInput
              type="email"
              label="Email *"
              required={true}
              setInputText={setEmail}
            />
            <FormInput
              type="password"
              label="Password *"
              required={true}
              setInputText={setPassword}
              minlength={6}
            />
            <FormInput
              type="password"
              label="Confirm Password *"
              required={true}
              setInputText={setConfirmPassword}
            />
          </div>

          <div className="form-control mt-6">
            <RegisterFormLabel label={"Company Description *"} />
            <textarea
              className="textarea textarea-bordered h-44 bg-transparent border-slate-500 w-full"
              maxLength={200}
              onChange={(e) => {
                setCompanyDescription(e.target.value);
              }}
              required
            ></textarea>
          </div>
          <div className="w-full flex justify-end mt-16">
            <SubmitButton label={"Sign Up"} isLoading={isLoading} />
          </div>
        </form>
      )}
    </AuthLayout>
  );
};

export default index;
