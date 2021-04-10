/* eslint-disable react/jsx-key */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Avatar,
  Button,
  Modal as ModalAntd,
  notification,
} from "antd";
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

import {
  getAvatarApi,
  activateUserApi,
  deleteUserApi,
} from "../../../../api/user";
import { getAccessToken } from "../../../../api/auth";

const { confirm } = ModalAntd;

export default function ListUsers(props) {
  const { usersActive, usersInactive, setReloadUsers } = props;
  const [viewUsersActives, setViewUsersActives] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const deleteUser = (user) => {
    const accessToken = getAccessToken();

    confirm({
      title: "Deleting user...",
      content: `Are you sure that you want to delete user ${user.email}`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          const res = await deleteUserApi(accessToken, user._id);
          notification["error"]({ message: res });
          setReloadUsers(true);
        } catch (err) {
          notification["error"]({ message: err });
        }
      },
    });
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
          deleteUser={deleteUser}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
          deleteUser={deleteUser}
        />
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
    deleteUser,
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
      renderItem={(user) => (
        <UserActive
          user={user}
          editUser={editUser}
          setReloadUsers={setReloadUsers}
          deleteUser={deleteUser}
        />
      )}
    />
  );
}

function UserActive(props) {
  const { user, editUser, deleteUser, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(async () => {
    if (user.avatar) {
      const res = await getAvatarApi(user.avatar);
      setAvatar(res);
    } else {
      setAvatar(null);
    }
  }, [user]);

  const desactivateUser = async () => {
    const accessToken = getAccessToken();
    try {
      const res = await activateUserApi(accessToken, user?._id, false);
      notification["success"]({ message: res });
      setReloadUsers(true);
    } catch (err) {
      notification["error"]({ message: err });
    }
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editUser(user)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => desactivateUser()}>
          <StopOutlined />
        </Button>,
        <Button type="danger" onClick={() => deleteUser(user)}>
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
  const { usersInactive, setReloadUsers, deleteUser } = props;

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <UserInactive
          user={user}
          setReloadUsers={setReloadUsers}
          deleteUser={deleteUser}
        />
      )}
    />
  );
}

function UserInactive(props) {
  const { user, setReloadUsers, deleteUser } = props;

  const [avatar, setAvatar] = useState(null);

  useEffect(async () => {
    if (user.avatar) {
      const res = await getAvatarApi(user.avatar);
      setAvatar(res);
    } else {
      setAvatar(null);
    }
  }, [user]);

  const activateUser = async () => {
    const accessToken = getAccessToken();
    try {
      const res = await activateUserApi(accessToken, user?._id, true);
      notification["success"]({ message: res });
      setReloadUsers(true);
    } catch (err) {
      notification["error"]({ message: err });
    }
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => activateUser()}>
          <CheckCircleOutlined />
        </Button>,
        <Button type="danger" onClick={() => deleteUser(user)}>
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
