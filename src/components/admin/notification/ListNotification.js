import React, { useState, useEffect, memo } from "react";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import exportDefault from "redux/action";
import { useDispatch } from "react-redux";
import { notification } from "antd";

function ListNotification({ data }) {
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setNotifications(data[page]);
    // setCount(data.length);
  }, [page, data]);
  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = data.length - 1;
      }
      return prevPage;
    });
  };
  const handlePage = (index) => {
    setPage(index);
  };
  const handleDelete = async (id) => {
    try {
      const access_token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/noti/admin/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      dispatch(exportDefault.deleteNotification(id));
      setShow(false)
      notification.success({
        message: "Thành công"
      })
      // window.location.reload();
    } catch (error) {
      console.log(error);
      setShow(false)
      notification.error({
        message: "Thất bại"
      })
    }
  };
  return (
    <>
      {notifications &&
        notifications.map((notification, index) => {
          const { title, content, isread, id } = notification;
          return (
            <div
              className={
                isread === false
                  ? "text__bold px-lg-3 py-2 hover-item d-flex flex-row w-100"
                  : "px-lg-3 py-2 hover-item d-flex flex-row w-100"
              }
              key={index}
            >
              <div className="w-100">
                <p
                  style={{
                    textTransform: "capitalize",
                    wordBreak: "break-all",
                    fontSize: "18px",
                  }}
                >
                  {title}
                </p>
                <p>{content}</p>
              </div>
              <div className="item-action float-end">
                <Dropdown>
                  <Dropdown.Toggle
                    className="dropdown-comment"
                    variant="success"
                    id="dropdown-basic"
                  >
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown__menu">
                    <button
                      className="btn btn-danger w-100"
                      onClick={handleShow}
                    >
                      Xóa thông báo
                    </button>
                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Xóa thông báo</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          Bạn chắc chắn muốn xóa thông báo?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Hủy
                        </Button>
                        <Button variant="primary" onClick={() => handleDelete(id)}>Xóa</Button>
                      </Modal.Footer>
                    </Modal>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          );
        })}
      {notifications && (
        <div className="btn-container">
          <button className="prev-btn" onClick={prevPage}>
            prev
          </button>
          {data.map((item, index) => {
            return (
              <button
                key={index}
                className={`page-btn ${index === page ? "active-btn" : null}`}
                onClick={() => handlePage(index)}
              >
                {index + 1}
              </button>
            );
          })}
          <button className="next-btn" onClick={nextPage}>
            next
          </button>
        </div>
      )}
    </>
  );
}

export default memo(ListNotification);
