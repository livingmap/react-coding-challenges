import { browseRequest } from "../api";

const getNewReleases = async () => {
  const { data } = await browseRequest("new-releases");

  return data.albums.items;
};

const endpoints = {
  getNewReleases,
};

export default endpoints;
