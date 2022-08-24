import React, { memo, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../../assets/css/maincontent.css";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import exportDefault from "../../../redux/action";
import { notification } from "antd";

function EditUser({ id, data }) {
  const [initialValues, setInitialValues] = useState({
    username: "",
    password: "",
    mail: "",
    role: "",
    profileImg: "",
  });
  const [, setUrlImage] = useState(null);
  const [errorLogin, ] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [initImage, setInitImage] = useState(null);
  const token = localStorage.getItem("token");
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  useEffect(() => {
    data.forEach((user) => {
      if (user.id === parseInt(id)) {
        if (user.profileImg !== null) {
          const arrImage = user.profileImg.split("\\");
          const urlImg = `http://localhost:5000/userimages/${arrImage[2]}`;
          setUrlImage(urlImg);
          setInitImage(urlImg);
        }
        setInitialValues({
          phone: user.phone,
          mail: user.mail,
          role: user.role,
          username: user.username,
          profileImg: user.profileImg,
        });
      }
    });
  }, [data,id]);
  const formik = useFormik({
    initialValues: {
      phone: "",
      mail: "",
      role: "",
    },
    validationSchema: yup.object({
      phone: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Please enter your phone"),
      mail: yup
        .string()
        .required("Please enter your mail")
        .min(4, "must be at least 4 characters long")
        .email("must be a valid email"),
    }),
    onSubmit: async (values) => {
      try {
        // let formData = new FormData();
        // formData.append("file", file);
        await axios.put(
          `http://localhost:5000/auth/admin/${id}`,
          {
            phone: values.phone,
            mail: values.mail,
            role: values.role,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        await axios.post(
          "http://localhost:5000/noti/admin",
          {
            title: "Sửa thông tin người dùng",
            content: "Sửa thông tin thành công",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(
          exportDefault.editUser({
            id: id,
            phone: values.phone,
            mail: values.mail,
            role: values.role,
            // profileImg: values.profileImg,
          })
        );
        dispatch(
          exportDefault.addNotification({
            title: "Sửa thông tin người dùng",
            content: "Sửa thàn công thông tin người dùng"
          })
        );
        setShow(false);
        notification.success({
          message: "Thành công"
        })
      } catch (error) {
        if (error.statusCode === 500) {
          setShow(false);
        } else {
          await axios.post(
            "http://localhost:5000/noti/admin",
            {
              title: "Sửa thông tin người dùng",
              content: "Sửa thông tin thất bại. Vui lòng thử lại",
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          dispatch(
            exportDefault.addNotification({
              title: "Sửa thông tin người dùng",
              content: "Sửa thông tin thất bại. Vui lòng thử lại",
            })
          );
          console.log(error);
          notification.error({
            message: "Thất bại"
          })
        }
        // console.log(error);
      }
    },
  });
  return (
    <>
      <Button
        variant="warning"
        onClick={() => {
          handleShow();
          formik.values.mail = initialValues.mail;
          formik.values.phone = initialValues.phone;
          formik.values.role = initialValues.role;
          setUrlImage(initImage);
          setIsEdit(true);
        }}
        className="w-100 text-start"
      >
        Sửa thông tin
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text">Sửa thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-login py-2" onSubmit={formik.handleSubmit}>
            {errorLogin ? <p className="error-login">{errorLogin}</p> : null}
            <div className="form-text">
              <label>Tên người dùng</label>
              <input
                name="username"
                type="text"
                value={initialValues.username}
                onChange={formik.handleChange}
              />
              {formik.touched.username && formik.errors.username ? (
                <p className="error">{formik.errors.username}</p>
              ) : null}
            </div>
            <div className="form-text">
              <label>Số điện thoại</label>
              <input
                name="phone"
                type="text"
                value={
                  isEdit === false ? initialValues.phone : formik.values.phone
                }
                onChange={formik.handleChange}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <p className="error">{formik.errors.phone}</p>
              ) : null}
            </div>
            <div className="form-text">
              <label>Địa chỉ email</label>
              <input
                name="mail"
                type="text"
                value={
                  isEdit === false ? initialValues.mail : formik.values.mail
                }
                onChange={formik.handleChange}
              />
              {formik.touched.mail && formik.errors.mail ? (
                <p className="error">{formik.errors.mail}</p>
              ) : null}
            </div>
            <div className="form-text">
              <select
                name="role"
                value={
                  isEdit === false ? initialValues.role : formik.values.role
                }
                className="p-2"
                onChange={formik.handleChange}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>
            <Button variant="secondary" onClick={handleClose} className="me-3">
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Cập nhật
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default memo(EditUser);
