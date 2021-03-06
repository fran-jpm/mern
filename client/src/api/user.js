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

export async function getUsersApi(token) {
  const url = `${BASE_PATH}/${apiVersion}/users`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();

    const users = result;

    return users;
  } catch (err) {
    return err.message;
  }
}

export async function getUsersActiveApi(token, status) {
  const url = `${BASE_PATH}/${apiVersion}/users-active?active=${status}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();

    const users = result;

    return users;
  } catch (err) {
    return err.message;
  }
}

export async function uploadAvatarApi(token, avatar, userId) {
  const url = `${BASE_PATH}/${apiVersion}/upload-avatar/${userId}`;
  const formData = new FormData();
  formData.append("avatar", avatar, avatar.name);

  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();

    return result;
  } catch (err) {
    return err.message;
  }
}

export async function getAvatarApi(avatarName) {
  const url = `${BASE_PATH}/${apiVersion}/get-avatar/${avatarName}`;

  try {
    const response = await fetch(url);
    // const result = await response.json();

    return response.url;
  } catch (err) {
    return err.message;
  }
}

export async function updateUserApi(token, user, userId) {
  const url = `${BASE_PATH}/${apiVersion}/user/${userId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();

    return result;
  } catch (err) {
    return err.message;
  }
}

export async function activateUserApi(token, userId, active) {
  const url = `${BASE_PATH}/${apiVersion}/activate-user/${userId}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ active: active }),
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();

    return result.message;
  } catch (err) {
    return err.message;
  }
}

export async function deleteUserApi(token, userId) {
  const url = `${BASE_PATH}/${apiVersion}/user/${userId}`;
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  try {
    const res = await fetch(url, params);
    const result = await res.json();

    return result.message;
  } catch (err) {
    return err.message;
  }
}

export async function signUpAdminApi(token, data) {
  const url = `${BASE_PATH}/${apiVersion}/sign-up-admin`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch(url, params);
    const result = await res.json();

    return result;
  } catch (e) {
    return e.message;
  }
}
