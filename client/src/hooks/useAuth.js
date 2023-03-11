import { useCookies } from "react-cookie";
import { parseJwt } from "../utils";

export const useAuth = () => {
  const [cookies] = useCookies(["access_token"]);

  if (cookies.access_token) {
    const { role } = parseJwt(cookies.access_token);
    return { status: true, role };
  } else {
    return { status: false };
  }
};
