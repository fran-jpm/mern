import { BASE_PATH, apiVersion } from "./config";
import { ACCESS_TOKEN, RESFRESH_TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

export function getAccessToken() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (!accessToken) {
    return null;
  }

  return willExpireToken(accessToken) ? null : accessToken;
}

export function getRefreshToken() {
  const refreshToken = localStorage.getItem(RESFRESH_TOKEN);

  if (!refreshToken) {
    return null;
  }

  return willExpireToken(refreshToken) ? null : refreshToken;
}

export async function refreshAccessToken(refreshToken) {
  const url = `${BASE_PATH}/${apiVersion}/refresh-access-token`;
  const bodyObj = {
    refreshToken,
  };

  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, params);
  if (response.status !== 200) {
    return null;
  }
  const result = await response.json();
  if (!result) {
    logout();
  } else {
    const { accessToken, refreshAccess } = result;
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(RESFRESH_TOKEN, refreshAccess);
  }
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(RESFRESH_TOKEN);
}

// Has token expire??
function willExpireToken(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;

  return now > exp;
}
