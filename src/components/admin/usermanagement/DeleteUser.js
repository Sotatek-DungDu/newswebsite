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
          title: "X??a ng?????i d??ng",
          content: "X??a ng?????i d??ng th??nh c??ng",
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      dispatch(exportDefault.deleteUser(id));
      dispatch(
        exportDefault.addNotification({
          title: "X??a ng?????i d??ng",
          content: "X??a ng?????i d??ng th??nh c??ng",
        })
      );
      setShow(false);
      notification.success({
        message: "Th??nh c??ng",
      });
    } catch (error) {
      await axios.post(
        "http://localhost:5000/noti/admin",
        {
          title: "X??a ng?????i d??ng",
          content: "X??a ng?????i d??ng th???t b???i. H??y th??? l???i.",
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      dispatch(
        exportDefault.addNotification({
          title: "X??a ng?????i d??ng",
          content: "X??a ng?????i d??ng th???t b???i. H??y th??? l???i.",
        })
      );
      console.log(error);
      setShow(false);
      notification.error({
        message: "Th???t b???i",
      });
    }
    // window.location.reload();
  };

  return (
    <>
      <button className="btn btn-danger w-100 text-start" onClick={handleShow}>
        X??a ng?????i d??ng
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>X??a ng?????i d??ng</Modal.Title>
        </Modal.Header>
        <Modal.Body>B???n c?? ch???c ch???n mu???n x??a ng?????i d??ng?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            H???y
          </Button>
          <Button variant="primary" onClick={handleClick}>
            X??a
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default memo(DeleteUser);
