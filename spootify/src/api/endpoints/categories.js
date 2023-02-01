import { browseRequest } from "../api";

const getCategories = async () => {
  const { data } = await browseRequest("categories");

  return data.categories.items;
};

const endpoints = {
  getCategories,
};

export default endpoints;
