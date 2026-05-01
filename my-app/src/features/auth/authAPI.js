import axios from "axios";

export const loginAPI = async (data) => {
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/login", data);
    return res.data;
  } catch (error) {
    throw error.response?.data?.detail || "Login failed";
  }
};

export const signupAPI = async (data) => {
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/signup", data);
    return res.data;
  } catch (error) {
    throw error.response?.data?.detail || "Signup failed";
  }
};