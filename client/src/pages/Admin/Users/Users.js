import React, { useState, useEffect } from "react";
import { getAccessToken } from "../../../api/auth";
import { getUsersActiveApi } from "../../../api/user";

import "./Users.scss";

export default function Users() {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);

  const token = getAccessToken();

  console.log(usersActive);
  console.log(usersInactive);

  useEffect(async () => {
    const active = await getUsersActiveApi(token, true);
    setUsersActive(active);
    const inactive = await getUsersActiveApi(token, false);
    setUsersInactive(inactive);
  }, [token]);
  return (
    <div>
      <h1>Lista</h1>
    </div>
  );
}
