import axios from "axios";
import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import exportDefault from "../../../redux/action";
import { Modal, Button } from "react-bootstrap";
import { notification } from "antd";
import _ from "lodash";

function DeleteUser({ id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("token");
  const listUser = useSelector(state => state.users.listUser)

  const handleClick = async () => {
    try {
      const responsive = await axios.get(`http://localhost:5000/news/cmt`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      let nameUser = undefined;
      if(listUser) {
        listUser.forEach((item) => {
          if(item.id === id) {
            nameUser = item.username
          }
        })
      }
      const arrComment = _.filter(responsive.data, function (o) {
        return (o.id_user === id);
      });
      if (arrComment) {
        arrComment.forEach((item) => {
          const { id } = item;
          if (id) {
            (async () => {
              await axios.delete(`http://localhost:5000/news/cmt/admin/${id}`, {
                headers: { Authorization: `Bearer ${access_token}` },
              });
            })();
          }
        });
      }
      const res = await axios.get(`http://localhost:5000/feedback/admin`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      if(nameUser) {
        const arrFeedback = _.filter(res.data, function (o) {
          return (o.name === nameUser);
        });
        if (arrFeedback) {
          arrFeedback.forEach((item) => {
            const { id } = item;
            if (id) {
              (async () => {
                await axios.delete(`http://localhost:5000/feedback/admin/${id}`, {
                  headers: { Authorization: `Bearer ${access_token}` },
                });
              })();
            }
          });
        }
      }
      await axios.delete(`http://localhost:5000/auth/admin/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      await axios.post(
        "http://localhost:5000/noti/admin",
        {
          title: "Xóa người dùng",
          content: "Xóa người dùng thành công",
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      dispatch(exportDefault.deleteUser(id));
      dispatch(
        exportDefault.addNotification({
          title: "Xóa người dùng",
          content: "Xóa người dùng thành công",
        })
      );
      setShow(false);
      notification.success({
        message: "Thành công",
      });
    } catch (error) {
      await axios.post(
        "http://localhost:5000/noti/admin",
        {
          title: "Xóa người dùng",
          content: "Xóa người dùng thất bại. Hãy thử lại.",
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      dispatch(
        exportDefault.addNotification({
          title: "Xóa người dùng",
          content: "Xóa người dùng thất bại. Hãy thử lại.",
        })
      );
      console.log(error);
      setShow(false);
      notification.error({
        message: "Thất bại",
      });
    }
    // window.location.reload();
  };

  return (
    <>
      <button className="btn btn-danger w-100 text-start" onClick={handleShow}>
        Xóa người dùng
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa người dùng?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default memo(DeleteUser);
