import React, { useEffect, useState } from "react";
import AuthInput from "../../components/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "../../components/InputLabel";
import SubmitButton from "../../components/SubmitButton";
import { forgotPassword } from "../../api/auth";
import { toast } from "react-hot-toast";

const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const roles = [
    {
      name: "Candidate",
      role: "user",
    },
    {
      name: "Company",
      role: "company",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      toast.error("Please select Account Type");
      return;
    }

    setIsLoading(true);
    const formData = {
      email,
      password,
      role,
    };
    const result = await forgotPassword(formData);

    if (!result) {
      toast.error("Error forgetting password.");
      return;
    }

    toast.success("Password Changed");
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      navigate("/login");
    }
  }, [isLoading]);

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col bg-black text-white">
      <h2 className="w-[40%] mx-auto py-2 text-xl font-medium">
        Forgot Password
      </h2>
      <div className="w-[40%] mx-auto h-[48vh] border-2 rounded-md p-4 border-white">
        <form onSubmit={handleSubmit}>
          <AuthInput
            type="email"
            label="Email *"
            required={true}
            setInputText={setEmail}
          />
          <AuthInput
            type="password"
            label="New Password *"
            required={true}
            setInputText={setPassword}
          />
          <div className="form-control my-2">
            <InputLabel label={"Select Account Type *"} color="white" />
            <select
              className="white-select"
              required
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option disabled selected>
                Select Account Type
              </option>
              {roles.map(({ name, role }, idx) => {
                return (
                  <option key={idx} className="text-black" value={role}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="w-full flex justify-end items-center mt-7">
            <SubmitButton label={"Change Password"} isLoading={isLoading} />
          </div>
        </form>
      </div>
      <h2 className="w-[40%] mx-auto py-2 text-base">
        Remeber your password?
        <span className="text-base font-normal text-green-500">
          <Link to="/login"> Login.</Link>
        </span>
      </h2>
    </div>
  );
};

export default index;
