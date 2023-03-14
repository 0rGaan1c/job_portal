import axios from "axios";
import { USERURL } from "../constant";

export const getAllAppliedJobs = async (userID) => {
  try {
    const { data } = await axios.get(`${USERURL}/job/${userID}`);
    return data.status === "ok" ? data.data : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};
