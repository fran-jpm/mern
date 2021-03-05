import { basePath, apiVersion } from "./config";
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

// Has token expire??
function willExpireToken(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;

  return now > exp;
}
