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
