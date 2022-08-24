import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import exportDefault from "../../../redux/action";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { notification } from "antd";

function CommentDelete({ id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("token");
  const handelClick = async () => {
    try {
      await axios.delete(`http://localhost:5000/news/cmt/admin/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      await axios.post(
        "http://localhost:5000/noti/admin",
        {
          title: "Xóa bình luận",
          content: "Xóa bình luận thành công.",
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      dispatch(exportDefault.deleteComment(id));
      dispatch(
        exportDefault.addNotification({
          title: "Xóa bình luận",
          content: "Xóa bình luận thành công.",
        })
      );
      setShow(false)
      notification.success({
        message: "Thành công"
      })
    } catch (error) {
      await axios.post(
        "http://localhost:5000/noti/admin",
        {
          title: "Xóa bình luận",
          content: "Xóa bình luận thất bại. Vui lòng thử lại",
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      // dispatch(exportDefault.deleteComment(id));
      dispatch(
        exportDefault.addNotification({
          title: "Xóa bình luận",
          content: "Xóa bình luận thất bại. Vui lòng thử lại",
        })
      );
      setShow(false);
      notification.error({
        message: "Thất bại"
      })
    }
    // window.location.reload();
  };

  return (
    <>
      <button className="btn btn-danger mw-100 w-100" onClick={handleShow}>
      Xóa
    </button>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa bình luận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn xóa bình luận
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handelClick}>Xóa</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default memo(CommentDelete);
