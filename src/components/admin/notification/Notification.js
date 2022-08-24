import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import ListNotification from "./ListNotification";
import paginate from "context/utils";
import exportDefault from "redux/action";
import { useDispatch, useSelector } from "react-redux";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const listNotification = useSelector(state => state.notifications);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const access_token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/noti/admin`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        dispatch(exportDefault.setNotifications(res.data.sort((a, b) => (a.id < b.id ? 1 : -1))));
        // setNotifications(paginate(res.data.sort((a, b) => (a.id < b.id ? 1 : -1))));
      } catch (error) {
        console.log(error);
      }
    };
    getNotifications();
  }, [dispatch, listNotification.loading]);
  
  useEffect(() => {
    setNotifications(paginate(listNotification.listNotification))
  },[listNotification.listNotification])
  return (
    <div className="my-sm-5 main__content">
      <Container className="px-sm-5 position-relative">
        <h3 className="d-block px-sm-3 mb-4">Tất cả thông báo</h3>
        <div className="w-100">
          <ListNotification data={notifications}/>
        </div>
      </Container>
    </div>
  );
}

export default Notification;
