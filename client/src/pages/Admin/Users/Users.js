/* eslint-disable no-debugger */
import React, { useState, useEffect } from "react";
import { getAccessToken } from "../../../api/auth";
import { getUsersActiveApi } from "../../../api/user";
import ListUsers from "../../../components/Admin/Users/ListUsers/ListUsers";

import "./Users.scss";

export default function Users() {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);

  const token = getAccessToken();

  useEffect(async () => {
    const active = await getUsersActiveApi(token, true);
    setUsersActive(active.users);
    const inactive = await getUsersActiveApi(token, false);
    setUsersInactive(inactive.users);
  }, [token]);
  return (
    <div className="users">
      <ListUsers usersActive={usersActive} usersInactive={usersInactive} />
    </div>
  );
}
