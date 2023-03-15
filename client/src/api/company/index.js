import axios from "axios";
import { COMPANYURL } from "../constant";

export const getCompanyDetails = async (companyID) => {
  try {
    const { data } = await axios.get(`${COMPANYURL}/detail/${companyID}`);
    return data.status === "ok" ? data.data : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getAllCompanyJobs = async (companyID) => {
  try {
    const { data } = await axios.get(`${COMPANYURL}/job/${companyID}`);
    return data.status === "ok" ? data.data : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

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

export const createJob = async (formData) => {
  try {
    const { data } = await axios.post(`${COMPANYURL}/job`, formData);
    return data.status === "ok" ? data.data : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const changeJobStatus = async (formData) => {
  try {
    const { data } = await axios.patch(`${COMPANYURL}/job/applied`, formData);
    return data.status === "ok" ? data.data : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getJobStatus = async (formData) => {
  try {
    const { data } = await axios.post(`${COMPANYURL}/job/status`, formData);
    return data.status === "ok" ? data.data[0] : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};
