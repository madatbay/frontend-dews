import API from "../axios";

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

  const getSuggestedUserList = async () => {
    return await API.get("/user/suggested-users-list/");
  };

  const postUserFollowingRequest = async (body) => {
    return await API.post("/user/update-user-followings/", body);
  };

  // Blog
  const listPosts = async () => {
    return await API.get("/blog/blog/");
  };

  const createPost = async (body) => {
    return await API.post("/blog/blog/", body);
  };

  const deletePost = async (id) => {
    return await API.delete(`/blog/blog/${id}/`);
  };

  const votePost = async (id, body) => {
    return await API.put(`/blog/blog/${id}/vote/`, body);
  };

  return {
    getUser,
    updateUser,
    register,
    getSuggestedUserList,
    postUserFollowingRequest,
    listPosts,
    createPost,
    deletePost,
    votePost,
  };
};

export default useApi;
