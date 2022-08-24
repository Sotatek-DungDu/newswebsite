import React, { memo} from "react";
import exportDefault from "../../../redux/action";
import axios from "axios";
import { useDispatch} from "react-redux";
import { notification } from "antd";

function Done({ id }) {
  // const [done, setDone] = useState(false)
  // const feedback
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      await axios.put(
        `http://localhost:5000/feedback/admin/${id}`,
        {
          isread: false,
          isdone: false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await axios.post(
        "http://localhost:5000/noti/admin",
        {
          title: "Giải quyết phản hồi",
          content: "Giải quyết phản hồi thành công.",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        exportDefault.addNotification({
          title: "Giải quyết phản hồi",
          content: "Giải quyết phản hồi thành công.",
        })
      );
      dispatch(
        exportDefault.editFeedback({
          id: id,
          isread: false,
          isdone: false,
        })
      );
      notification.success({
        message: "Thành công"
      })
    } catch (error) {
      console.log(error);
      await axios.post(
        "http://localhost:5000/noti/admin",
        {
          title: "Giải quyết phản hồi",
          content: "Giải quyết phản hồi thất bại. Vui lòng thử lại.",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        exportDefault.addNotification({
          title: "Giải quyết phản hồi",
          content: "Giải quyết phản hồi thất bại. Vui lòng thử lại.",
        })
      );
      notification.error({
        message: "Thất bại"
      })
    }
  };
  return (
    <>
      <button className="btn btn-success w-100" onClick={handleClick}>
        Giải quyết
      </button>
    </>
  );
}

export default memo(Done);
