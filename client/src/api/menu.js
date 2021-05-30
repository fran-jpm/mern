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

export async function updateMenuApi(token, menuId, data) {
  const url = `${BASE_PATH}/${apiVersion}/menu/${menuId}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, params);
    const res = await response.json();
    return res.message;
  } catch (err) {
    return err.message;
  }
}
