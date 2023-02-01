import { browseRequest } from "../api";

const getFeaturedPlaylists = async () => {
  const { data } = await browseRequest("featured-playlists");

  return data.playlists.items;
};

const endpoints = {
  getFeaturedPlaylists,
};

export default endpoints;
