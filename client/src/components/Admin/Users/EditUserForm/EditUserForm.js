/* eslint-disable react/prop-types */
import React, { useCallback, useState } from "react";
import { Avatar, Form, Input, Select, Button, Row, Col } from "antd";
import { useDropzone } from "react-dropzone";
import "./EditUserForm.scss";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";

export default function EditUserForm(props) {
  const { user } = props;
  const [avatar, setAvatar] = useState(null);

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm />
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
  const { user, userData, setUserData, updateUser } = props;

  return (
    <div>
      <h1>edit</h1>
      <h2>form</h2>
    </div>
  );
}
