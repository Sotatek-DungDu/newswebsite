import React, { memo, useLayoutEffect, useState } from "react";

import useFetchData from "../../../hooks/useFetchData";
import { useDispatch, useSelector } from "react-redux";
import exportDefault from "../../../redux/action";
import { REQUEST_STATE } from "../../../configs";
import { useEffect } from "react";
import { GET } from "../../../api/fetch";
import { Table, Tag, Space } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import "../../../assets/css/listposts.css";

function ListAds({ setIsEdit, setIdEdit }) {
  const [posts, setPosts] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATE.REQUEST);
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title_advertise",
      key: "title_advertise",
    },
    {
      title: "Hình ảnh",
      dataIndex: "img_advertise",
      key: "img_advertise",
    },
    {
      title: "Thao tác",
      key: "post_action",
      render: (id) => (
        <div className="btn-group">
          <button className="btn btn-warning sua" onClick={() => handleEdit(id)}>
            Sửa{" "}
          </button>
          <button
            className="btn btn-danger btn-block xoa"
            onClick={() => handleDelete(id)}
          >
            <i className="fa fa-delete " /> Xoá
          </button>
        </div>
      ),
    },
  ];
  const handleEdit = (id) => {
    setIsEdit(true);
    setIdEdit(id.id);
  };
  const handleDelete = (id) => {
    (async () => {
      const access_token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/adv/admin/${id.id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      await axios.post(
        "http://localhost:5000/noti/admin",
        {
          title: "Delete Advertisement",
          content: "Successfully deleted advertisement",
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      window.location.reload();
    })();
  };
  useEffect(() => {
    (async () => {
      let listPost = await GET("/adv");
      listPost = listPost.sort((a, b) => (a.id < b.id ? 1 : -1))
      // if (listPost.data.profileImg !== null) {
      //   const arrImage = resp.data.profileImg.split("\\");
      //   const urlImg = `http://localhost:5000/userimages/${arrImage[2]}`;
      //   setUrlImage(urlImg);
      // }
      let urlImage = null;
      listPost = listPost.map((post, index) => {

        if (post.img_advertise !== null) {
          const arrImage = post.img_advertise.split("\\");
          urlImage = `http://localhost:5000/advimages/${arrImage[2]}`;
        }
        return {
          index: index + 1,
          ...post,
        };
      });

      setPosts(listPost);
      setRequestStatus(REQUEST_STATE.SUCCESS);
    })();
  }, []);
  console.log(posts);
  return (
    <div className="list">
      <div className="og-container">
        <Table
          columns={columns}
          dataSource={posts}
          loading={requestStatus === REQUEST_STATE.REQUEST}
          style={{ overflowX: "auto" }}
        />
      </div>
    </div>
  );
}

export default ListAds;
