/* eslint-disable react/jsx-key */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import { Switch, List, Avatar, Button } from "antd";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import {
  EditOutlined,
  StopOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import "./ListUsers.scss";
import Modal from "../../Modal/Modal";
import EditUserForm from "../EditUserForm/EditUserForm";

import { getAvatarApi } from "../../../../api/user";

export default function ListUsers(props) {
  const { usersActive, usersInactive, setReloadUsers } = props;
  const [viewUsersActives, setViewUsersActives] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const deleteUser = (email) => {
    console.log(email);
  };

  return (
    <div className="list-users">
      <div className="list-users__switch">
        <Switch
          defaultChecked
          onChange={() => setViewUsersActives(!viewUsersActives)}
        />
        <span>{viewUsersActives ? "Active users" : "Inactive Users"}</span>
      </div>
      {viewUsersActives ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          onDeleteButton={deleteUser}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive usersInactive={usersInactive} />
      )}
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function UsersActive(props) {
  const {
    usersActive,
    setIsVisibleModal,
    onDeleteButton,
    setModalContent,
    setModalTitle,
    setReloadUsers,
  } = props;

  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(`Edit ${user.name || "..."} ${user.lastname || "..."}`);
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => <UserActive user={user} editUser={editUser} />}
    />
  );
}

function UserActive(props) {
  const { user, editUser, deleteUser } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(async () => {
    if (user.avatar) {
      const res = await getAvatarApi(user.avatar);
      setAvatar(res);
    } else {
      setAvatar(null);
    }
  }, [user]);

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editUser(user)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => console.log("cancel")}>
          <StopOutlined />
        </Button>,
        <Button type="danger" onClick={() => console.log("delete")}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                ${user.name ? user.name : "..."} 
                ${user.lastname ? user.lastname : "..."} 
            `}
        description={user.email}
      />
    </List.Item>
  );
}

function UsersInactive(props) {
  const { usersInactive } = props;

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => <UserInactive user={user} />}
    />
  );
}

function UserInactive(props) {
  const { user } = props;

  const [avatar, setAvatar] = useState(null);

  useEffect(async () => {
    if (user.avatar) {
      const res = await getAvatarApi(user.avatar);
      setAvatar(res);
    } else {
      setAvatar(null);
    }
  }, [user]);

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => console.log("Avtive user")}>
          <CheckCircleOutlined />
        </Button>,
        <Button type="danger" onClick={() => console.log("Borrar user")}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                  ${user.name ? user.name : "..."} 
                  ${user.lastname ? user.lastname : "..."} 
              `}
        description={user.email}
      />
    </List.Item>
  );
}
