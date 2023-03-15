import React, { useEffect, useState } from "react";
import { getJobRoles } from "../api/global";
import InputLabel from "./InputLabel";

const SelectJobRole = ({ setJobRole, textColor, isDisabled, value }) => {
  const [jobRoles, setJobRoles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setJobRoles(await getJobRoles());
    };

    fetchData();
  }, []);

  return (
    <div className="form-control my-2">
      <InputLabel label={"Select Job Role *"} color={textColor} />
      <select
        className={`${textColor}-select`}
        required
        onChange={(e) => {
          setJobRole(e.target.value);
        }}
        disabled={isDisabled}
      >
        <option disabled selected>
          {value || "Select Job Role"}
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
  );
};

export default SelectJobRole;
