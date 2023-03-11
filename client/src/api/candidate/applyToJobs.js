import axios from "axios";
import { USERURL } from "../constant";

export const applyToJobs = async (formData) => {
  try {
    const { data } = await axios.post(`${USERURL}/job`, formData);
    console.log(data);
    return data.status === "ok" ? data.data : data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
