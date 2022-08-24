import React, { memo, useLayoutEffect, useState } from "react";
import "../../../assets/css/listposts.css";
import useFetchData from "../../../hooks/useFetchData";
import { useDispatch, useSelector } from "react-redux";
import exportDefault from "../../../redux/action";
import { REQUEST_STATE } from "../../../configs";
import { useEffect } from "react";
import { GET } from "../../../api/fetch";
import { Table, Tag, Space } from "antd";
import Moment from "react-moment";
import "antd/dist/antd.css";
import DetailPosts from "./DetailPost";
import DeletePost from "./DeletePost";
import { Link } from "react-router-dom";

export default function ListPosts({ setIsEdit, setIdEdit }) {
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
      dataIndex: "title_news",
      key: "title_news",
    },
    {
      title: "Tóm tắt",
      dataIndex: "title_quote",
      key: "title_quote",
    },
    {
      title: "Ngày tạo",
      dataIndex: "date_posted",
      key: "date_posted",
      render: (createdAt) => {
        return (
          <Moment format="DD/MM/YYYY mm:hh:ss">
            <div>{createdAt?.toString()}</div>
          </Moment>
        );
      },
    },
    {
      title: "Chi tiết",
      key: "detail_post",
      render: (_, record) => {
        return <Link to={`/admin/posts/${record?.id}`}><div className="btn btn-warning sua">Chi tiết</div></Link>;
      },
    },
    {
      title: "Thao tác",
      key: "post_action",
      render: (id) => (
        <div className="btn-group">
          <button className="btn btn-warning sua" onClick={() => handleEdit(id)}>Sửa </button>
          <DeletePost id={id.id} />
        </div>
      ),
    },
  ];
  useEffect(() => {
    (async () => {
      let listPost = await GET("/news");
      listPost = listPost.sort((a, b) => (a.id < b.id ? 1 : -1))
      listPost = listPost.map((post, index) => {
        return {
          index: index + 1,
          ...post,
        };
      });
      console.log("listPost: ", listPost);

      setPosts(listPost);
      setRequestStatus(REQUEST_STATE.SUCCESS);
    })();
  }, []);

  const handleEdit = (id) => {
    setIsEdit(true);
    setIdEdit(id.id);
  };

  return (
    <div className='list'>
      <div className="og-container">
        <Table columns={columns} dataSource={posts} loading={requestStatus == REQUEST_STATE.REQUEST} style={{ overflowX: "auto" }} />

      </div>
    </div>
  )
}