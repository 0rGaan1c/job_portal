import axios from "axios";
import { URL } from "./constant";

export const register = async (formData) => {
  try {
    const { data } = await axios.post(`${URL}/register`, formData);
    return data.status === "ok" ? "ok" : false;
  } catch (err) {
    console.error(err);
    if (err.response.data.error.includes("duplicate")) {
      return "Email already in use.";
    } else {
      return "Something went wrong";
    }
  }
};

export const login = async (formData) => {
  try {
    const { data } = await axios.post(`${URL}/login`, formData);
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const forgotPassword = async (formData) => {
  try {
    const { data } = await axios.post(`${URL}/forgotpassword`, formData);
    return data.status === "ok" ? "ok" : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};
