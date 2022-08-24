import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import exportDefault from "redux/action";

function DeletePost({ id }) {
  const dispatch = useDispatch();
  function onClick() {
    (async () => {
      const access_token = localStorage.getItem("token");
      const comments = await axios.get(`http://localhost:5000/news/cmt/${id}`);
      if(comments) {
        comments.data.forEach((item) => {
            const { id } = item;
            (async () => {
              try {
                await axios.delete(`http://localhost:5000/news/cmt/admin/${id}`, {
                  headers: { Authorization: `Bearer ${access_token}` },
                });
                dispatch(exportDefault.deleteComment(id));
              } catch (error) {
                console.log(error);
              }
            })();
          });
      }
      await axios.delete(`http://localhost:5000/news/admin/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      window.location.reload();
      await axios.post(
        "http://localhost:5000/noti/admin",
        {
          title: "Delete News",
          content: "Successfully deleted news",
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
    })();
  }
  // console.log('id' + id);
  return (
    <button className="btn btn-danger btn-block xoa" onClick={onClick}>
      <i className="fa fa-delete " /> Xoá
    </button>
  );
}

export default DeletePost;
