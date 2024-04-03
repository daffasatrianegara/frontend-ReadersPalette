import { instance } from "../axios";

const login = async (email, password) => {
  try {
    const response = await instance.post("/admin/login", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
};

const registerAdmin = async ({
  email,
  password,
  name,
  gender,
  phone_number,
}) => {
  try {
    const response = await instance.post("/admin/register", {
      email,
      password,
      name,
      gender,
      phone_number,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
};

const getAllUsers = async () => {
  try {
    const response = await instance.get("/admin/users");
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
};

const getAllComment = async () => {
  try {
    const response = await instance.get("/admin/comments");
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
};

const getAllBooks = async ({ page, limit }) => {
  const response = await instance.get(
    `/admin/books?page=${page}&limit=${limit}`
  );
  return response.data;
};

const getDetailUsers = async (id) => {
  try {
    const response = await instance.get(`/admin/users/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
};

const deleteUsers = async (id) => {
  try {
    const response = await instance.delete(`/admin/users/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
};

const deleteComment = async (id) => {
  try {
    const response = await instance.delete(`/admin/comments/soft/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
};

const deleteBooks = async (id) => {
  try {
    const response = await instance.delete(`/admin/books/${id}`)
    return response.data
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong");
  }
}

export {
  login,
  registerAdmin,
  getAllUsers,
  getAllComment,
  getAllBooks,
  getDetailUsers,
  deleteUsers,
  deleteComment,
  deleteBooks
};
