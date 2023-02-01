import qs from "querystring";
import axios from "axios";
import config from "../config";

// Create a spotify api client
const api = axios.create({
  baseURL: config.api.baseUrl,
});

/**
 *
 * @returns access token
 */
const getAuth = async () => {
  try {
    const response = await axios.post(
      config.api.authUrl,
      qs.stringify({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization: `Basic ${btoa(
            `${config.api.clientId}:${config.api.clientSecret}`,
          )}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    return response.data.access_token;
  } catch (error) {
    console.error(error);
  }
};

 export const browseRequest = async (path) => {
  const ACCESS_TOKEN = await getAuth();

  return await api.request({
    method: 'GET',
    url: `/browse/${path}`,
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
  });
 }