import { API } from "../axios";

const useApi = () => {
  // Auth
  const getUser = async () => {
    return await API.get("/user/user/me/");
  };

  const updateUser = async (body) => {
    return await API.put("/user/user/me/", body);
  };

  const register = async (body) => {
    return await API.post("/user/user/", body);
  };

  return {
    getUser,
    updateUser,
    register,
  };
};

export default useApi;
