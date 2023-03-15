import axios from "axios";
import { USERURL } from "../constant";

export const applyToJobs = async (formData) => {
  try {
    const { data } = await axios.post(`${USERURL}/job`, formData);
    return data.status === "ok" ? data.data : data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getCandidateDetails = async (userID) => {
  try {
    const { data } = await axios.get(`${USERURL}/detail/${userID}`);
    return data.status === "ok" ? data.data : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getAllAppliedJobs = async (userID) => {
  try {
    const { data } = await axios.get(`${USERURL}/job/${userID}`);
    console.log(data);
    return data.status === "ok" ? data.data : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};
