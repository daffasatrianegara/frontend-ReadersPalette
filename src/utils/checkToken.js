import { validateToken } from "../hooks/tokenValidation";

const checkToken = async () => {
  const token = window.localStorage.getItem("token");
  if (!token) {
    window.localStorage.removeItem("token");
    return false
  }
  
  const check = validateToken(token);
  const { id, role } = check;
  if (role != "admin") {
    window.localStorage.removeItem("token");
    return false
  }

  return true
};

export default checkToken;
