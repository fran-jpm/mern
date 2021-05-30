import React, { useState, useEffect } from "react";
import DragSortableList from "react-drag-sortable";
import { Switch, List, Button, Modal as ModalAntd, notification } from "antd";
import Modal from "../../Modal";
import "./MenuWebList.scss";

const { confirm } = ModalAntd;
export default function MenuWebList(props) {
  const { menu, setReloadMenuWeb } = props;

  return (
    <div>
      <h1>MenuWebList....</h1>
      {menu.map((item) => {
        return <p key={item._id}>{item.title}</p>;
      })}
    </div>
  );
}
