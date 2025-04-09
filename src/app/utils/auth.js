import Cookies from "js-cookie";

export const getUserFromCookies = () => {
  const user = Cookies.get("user");
  return user ? JSON.parse(user) : null;
};
