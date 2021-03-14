/* eslint-disable react/prop-types */
import React, { useCallback, useState, useEffect } from "react";
import { Avatar, Form, Input, Select, Button, Row, Col } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import "./EditUserForm.scss";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";

export default function EditUserForm(props) {
  const { user } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({
    name: user.name ?? "",
    lastname: user.lastname ?? "",
    email: user.email ?? "",
    role: user.role ?? "",
    avatar: user.avatar ?? null,
  });

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar });
    }
  }, [avatar]);

  const updateUser = () => {
    console.log(userData);
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatar ? avatar.preview : NoAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser } = props;
  const { Option } = Select;

  return (
    <Form className="form-edit" onFinish={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
              placeholder="name"
              defaultValue={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
              placeholder="lastname"
              defaultValue={userData.lastname}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
              placeholder="email"
              defaultValue={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Select role"
              defaultValue={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e })}
            >
              <Option value="admin">Admin</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviewr">Reviewer</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
              type="password"
              placeholder="password"
              defaultValue={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
              type="password"
              placeholder="Repeat password"
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item className="btn-content">
        <Button type="primary" htmlType="submit" className="btn-submit">
          Update User
        </Button>
      </Form.Item>
    </Form>
  );
}
