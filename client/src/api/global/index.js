import axios from "axios";
import { URL } from "../constant";

export const getAllJobs = async () => {
  try {
    const { data } = await axios.get(`${URL}/alljob`);
    return data.status === "ok" ? data.data : [];
  } catch (err) {
    console.error(err);
  }
};

export const getJobRoles = async () => {
  try {
    const { data } = await axios.get(`${URL}/jobrole`);
    return data.status === "ok" ? data.data : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getJobByID = async (id) => {
  try {
    const { data } = await axios.get(`${URL}/job/${id}`);
    return data.status === "ok" ? data.data[0] : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};
