import { useCookies } from "react-cookie";
import { parseJwt } from "../utils";

export const useAuth = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  if (cookies.access_token) {
    const { role } = parseJwt(cookies.access_token);
    return { status: true, role };
  } else {
    return { status: false };
  }
};
