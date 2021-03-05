/* eslint-disable no-debugger */
import { BASE_PATH, apiVersion } from "./config";

export async function signUpApi(data) {
  const url = `${BASE_PATH}/${apiVersion}/sign-up`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();
    if (result.user) {
      return {
        ok: true,
        msg: "User created",
      };
    }

    return { ok: false, msg: result.message };
  } catch (err) {
    return { ok: false, msg: err.message };
  }

  // fetch(url, params)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((result) => {
  //     if (result.user) {
  //       return result;
  //     }
  //     return false;
  //   })
  //   .catch(() => {
  //     return false;
  //   });
}

export async function signInApi(data) {
  const url = `${BASE_PATH}/${apiVersion}/sign-in`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();

    if (result) {
      return result;
    }

    return { ok: false, msg: result.message };
  } catch (err) {
    return { ok: false, msg: err.message };
  }
}
