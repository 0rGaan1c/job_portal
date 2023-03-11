import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { login } from "../../api/auth";
import FormInput from "../../components/FormInput";
import RegisterFormLabel from "../../components/RegisterFormLabel";
import { useCookies } from "react-cookie";
import SubmitButton from "../../components/SubmitButton";

const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");
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

  const [_, setCookie] = useCookies(["access_token"]);

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
    const result = await login(formData);

    if (!result) {
      toast.error("Something went wrong.");
      setIsLoading(false);
      return;
    }
    if (result.status === "error" && result.error.includes("user/password")) {
      toast.error("Email or Password is invalid.");
      setIsLoading(false);
      return;
    }
    if (result.status === "ok") {
      console.log(result.data);
      window.localStorage.setItem("userID", result.data.userId);
      setCookie("access_token", result.data.token, { path: "/" });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col bg-black text-white">
      <h2 className="w-[40%] mx-auto py-2 text-xl font-medium">Log In</h2>
      <div className="w-[40%] mx-auto h-[48vh] border-2 rounded-md p-4 border-white">
        <form onSubmit={handleSubmit}>
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
          />
          <div className="form-control my-2">
            <RegisterFormLabel label={"Select Account Type *"} />
            <select
              className="register-select"
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

          <div className="w-full flex justify-between items-center mt-7">
            <p className="text-green-500">
              <Link to="/forgotpassword">Forgot your password?</Link>
            </p>
            <SubmitButton label={"Log In"} isLoading={isLoading} />
          </div>
        </form>
      </div>
      <h2 className="w-[40%] mx-auto py-2 text-base">
        Don't have an account?
        <span className="text-base font-normal text-green-500">
          <Link to="/register/candidate"> Register As Candidate</Link>
          <span className="text-white"> or </span>
          <Link to="/register/company"> Register As Company</Link>
        </span>{" "}
        <br />
        Or Go back to{" "}
        <span className="text-base font-normal text-green-500">
          <Link to="/">Home.</Link>
        </span>
      </h2>
    </div>
  );
};

export default index;
