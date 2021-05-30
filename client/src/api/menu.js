import { BASE_PATH, apiVersion } from "./config";

export async function getMenuApi(token) {
  const url = `${BASE_PATH}/${apiVersion}/menus`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  try {
    const response = await fetch(url, params);
    return await response.json();
  } catch (err) {
    return err.message;
  }
}
