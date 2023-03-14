import axios from "axios";
import { COMPANYURL } from "../constant";

export const getAppliedUsers = async (token, jobID) => {
  try {
    const { data } = await axios.post(`${COMPANYURL}/job/applied`, {
      token,
      jobID,
    });
    return data.status === "ok" ? data.data : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};
