import axios from "axios";

export const getProductsAPI = async (params = {}) => {
  try {
    // remove undefined / null values
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
    );

    console.log(cleanParams)

    const res = await axios.get(
      "http://127.0.0.1:8000/api/products/get_all_products",
      {
        params: cleanParams,
      }
    );

    return res.data;
  } catch (error) {
    throw error.response?.data?.detail || "Failed to fetch the data";
  }
};