import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Input from "../../../components/Input";
import { AiFillEdit } from "react-icons/ai";
import { useCookies } from "react-cookie";
import InputLabel from "../../../components/InputLabel";
import ContentLayout from "../../../Layout/ContentLayout";
import { getCompanyDetails, updateCompanyDetails } from "../../../api/company";

const index = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [cookie, setCookie] = useCookies(["access_token"]);
  const [isCompanyLoaded, setIsCompanyLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCompanyDetails(
        window.localStorage.getItem("userID")
      );

      if (!result) {
        toast.error("Error getting details");
        return;
      }
      // setUserDetails(result);
      setEmail(result.email);
      setCompanyName(result.companyName);
      setCompanyDescription(result.companyDescription);
      setIsCompanyLoaded(true);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await updateCompanyDetails({
      token: cookie.access_token,
      companyName,
      companyDescription,
    });

    if (!result) {
      toast.error("Error Updating Company details");
      return;
    }

    toast.success("Details Updated Successfully");
    setIsDisabled(true);
  };

  return (
    <ContentLayout>
      <h1 className="mb-2 font-medium text-xl">Your Profile</h1>
      {isCompanyLoaded && (
        <div className="border-2 p-4 rounded-sm">
          <div className="flex justify-between">
            <h1 className="font-medium text-lg">Details</h1>
            <button
              onClick={() => setIsDisabled(!isDisabled)}
              title="Edit Details"
            >
              <AiFillEdit className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-5">
              <Input
                value={email}
                type="email"
                label="Email *"
                required={true}
                isDisabled={true}
              />
              <Input
                value={companyName}
                type="text"
                label="Name *"
                required={true}
                setInputText={setCompanyName}
                isDisabled={isDisabled}
              />
            </div>
            <div className="form-control my-2">
              <InputLabel label={"Company Description *"} color="black" />
              <textarea
                className="textarea textarea-bordered h-28 bg-transparent border-slate-500 w-full"
                placeholder=""
                maxLength={200}
                onChange={(e) => {
                  setCompanyDescription(e.target.value);
                }}
                value={companyDescription}
                disabled={isDisabled}
              ></textarea>
            </div>
            <div className="w-full flex justify-end mt-4">
              <button
                className="btn btn-outline btn-success"
                disabled={isDisabled}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </ContentLayout>
  );
};

export default index;
