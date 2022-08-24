import React, { memo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../../assets/css/maincontent.css";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import exportDefault from "../../../redux/action";
import { notification } from "antd";

function AddUser() {
  const [errorLogin, setErrorLogin] = useState();
  const [show, setShow] = useState(false);
  const [file,] = useState();
  const [, setUrlImage] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true);setErrorLogin()};
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("token");
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      phone: "",
      mail: "",
      role: "user",
    },
    validationSchema: yup.object({
      username: yup.string().min(4, 'must be at least 4 characters long').max(15, 'Must be 15 characters or less').required("Please enter your Username"),
      password: yup.string().min(6, 'must be at least 6 characters long').required("Please enter your password"),
      phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Please enter your phone"),
      mail: yup.string().required("Please enter your mail").min(4, 'must be at least 4 characters long').email('must be a valid email'),
    }),
    onSubmit: async (values) => {
      // console.log(values.role);
      try {
        let formData = new FormData();
        formData.append("file", file);
        await axios.post("http://localhost:5000/auth/signup", {
          username: values.username,
          password: values.password,
          phone: values.phone,
          mail: values.mail,
        });
        
        await axios.post("http://localhost:5000/noti/admin", {
          title: "Thêm người dùng",
          content: "Thêm người dùng thành công"
        },{
          headers: { Authorization: `Bearer ${access_token}` },
        });
        
        dispatch(
          exportDefault.addUser({
            username: values.username,
            password: values.password,
            phone: values.phone,
            mail: values.mail,
            profileImg: values.profileImg
          })
        );
        dispatch(exportDefault.addNotification({
          title: "Thêm người dùng",
          content: "Thêm người dùng thành công"
        }))
        values.username = "";
        values.password = "";
        values.phone = "";
        values.mail = "";
        setUrlImage(null)
        setShow(false);
        notification.success({
          message: "Thành công",
        });
        // window.location.reload();
      } catch (err) {
        if (err.statusCode === 403) {
          setErrorLogin(err.message);
        }else if(err.statusCode === 500) {
          values.username = "";
          values.password = "";
          values.phone = "";
          values.mail = "";
          setUrlImage(null)
          setShow(false);
        }
        else {
          console.log(err);
          await axios.post("http://localhost:5000/noti/admin", {
          title: "Thêm người dùng",
          content: "Thêm người dùng thất bại. Hãy thử lại."
        },{
          headers: { Authorization: `Bearer ${access_token}` },
        });
        dispatch(exportDefault.addNotification({
          title: "Thêm người dùng",
          content: "Thêm người dùng thất bại. Xin thử lại."
        }))
        }
        notification.error({
          message: "Thất bại"
        })
      }
    },
  });
  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="position-absolute top-0"
        style={{ right: "20px" }}
      >
        Thêm người dùng
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thêm người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-login py-5" onSubmit={formik.handleSubmit}>
            {errorLogin ? <p className="error-login">{errorLogin}</p> : null}
            <div className="form-text">
              <label>Tên người dùng</label>
              <input
                name="username"
                type="text"
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username ? (
                <p className="error">{formik.errors.username}</p>
              ) : null}
            </div>
            <div className="form-text">
              <label>Mật khẩu</label>
              <input
                name="password"
                type="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="error">{formik.errors.password}</p>
              ) : null}
            </div>
            <div className="form-text">
              <label>Số điện thoại</label>
              <input
                name="phone"
                type="text"
                {...formik.getFieldProps("phone")}
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
                {...formik.getFieldProps("mail")}
              />
              {formik.touched.mail && formik.errors.mail ? (
                <p className="error">{formik.errors.mail}</p>
              ) : null}
            </div>
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Hủy
            </Button>
            <Button variant="primary" type="submit">
                Thêm
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default memo(AddUser);
