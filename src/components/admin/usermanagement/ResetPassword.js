import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import exportDefault from "redux/action";
import { notification } from "antd";

function ResetPassword({ id }) {
  const [errorLogin, setErrorLogin] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const access_token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: yup.object({
      password: yup.string().min(6, 'must be at least 6 characters long').required("Please enter your password"),
    }),
    onSubmit: async (values) => {
      try {
        const idCurrentAdmin = localStorage.getItem("id_admin_current")
        
        await axios.put(
          `http://localhost:5000/auth/admin/password/${id !== undefined ? id : idCurrentAdmin}`,
          { password: values.password },
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );
        await axios.post("http://localhost:5000/noti/admin", {
          title: "Thay đổi mật khẩu",
          content: "Thay đổi mật khẩu thành công."
        },{
          headers: { Authorization: `Bearer ${access_token}` },
        });
        dispatch(exportDefault.addNotification({
          title: "Thay đổi mật khẩu",
          content: "Thay đổi mật khẩu thành công."
        }))
        values.password = "";
        setShow(false);
        notification.success({
          message: "Thành công"
        })
      } catch (error) {
        await axios.post("http://localhost:5000/noti/admin", {
          title: "Thay đổi mật khẩu ",
          content: "Thay đổi mật khẩu thất bại. Vui lòng thử lại."
        },{
          headers: { Authorization: `Bearer ${access_token}` },
        });
        dispatch(exportDefault.addNotification({
          title: "Thay đổi mật khẩu ",
          content: "Thay đổi mật khẩu thất bại. Vui lòng thử lại."
        }))
        console.log(error);
        notification.error({
          message: "Thất bại"
        })
      }
    },
  });
  // const handleClick = async () => {
  //     const access_token = localStorage.getItem("token");
  //     await axios.put(`http://localhost:5000/auth/password/${id}`, {
  //       headers: { Authorization: `Bearer ${access_token}` },
  //     });
  //     //dispatch(exportDefault.deleteUser(id));
  //   };
  return (
    <>
      <Button variant={id ? "success" : ""} onClick={handleShow} className="w-100 px-3 text-start hover__card">
        Đổi mật khẩu
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nhập mật khẩu mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-login py-5" onSubmit={formik.handleSubmit}>
            {errorLogin ? <p className="error-login">{errorLogin}</p> : null}
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
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Cập nhật mật khẩu
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default ResetPassword;
