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

export const updateCandidateDetails = async (formData) => {
  try {
    const { data } = await axios.patch(`${USERURL}/detail`, formData);
    return data.status === "ok" ? data.data : data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getAllAppliedJobs = async (userID) => {
  try {
    const { data } = await axios.get(`${USERURL}/job/${userID}`);
    return data.status === "ok" ? data.data : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

// get projects, workexp, education
export const getProfileSection = async (userID, sectionType) => {
  try {
    const { data } = await axios.get(`${USERURL}/${sectionType}/${userID}`);
    return data.status === "ok" ? data.data : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

// create project, workexp, education
export const createProfileSection = async (sectionType, formData) => {
  try {
    const { data } = await axios.post(`${USERURL}/${sectionType}`, formData);
    console.log(data);
    return data.status === "ok" ? data.data : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

// edit project, workexp, education
export const editProfileSection = async (sectionType, formData) => {
  try {
    const { data } = await axios.patch(`${USERURL}/${sectionType}`, formData);
    console.log(data);
    return data.status === "ok" ? data.data : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

// delete project, workexp, education
export const deleteProfileSection = async (sectionType, formData) => {
  try {
    const { data } = await axios.delete(`${USERURL}/${sectionType}`, {
      data: formData,
    });
    console.log(data);
    return data.status === "ok" ? data.data : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};
