import React, { useState, useEffect } from "react";
import { getMenuApi } from "../../../api/menu";
import { getAccessToken } from "../../../api/auth";
import MenuWebList from "../../../components/Admin/MenuWeb/MenuWebList";
export default function MenuWeb() {
  const [menu, setMenu] = useState([]);
  const [reloadMenuWeb, setReloadMenuWeb] = useState(false);
  const token = getAccessToken();

  useEffect(async () => {
    const res = await getMenuApi(token);
    setMenu(res.menu);

    setReloadMenuWeb(false);
  }, [reloadMenuWeb]);
  return (
    <div className="menu-web">
      <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb} />
    </div>
  );
}
