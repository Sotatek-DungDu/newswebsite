import React, { memo, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import CommentList from "./CommentList";

function TableContent({ keyTab, dataAll, dataUser, dataNews }) {
  const [page, setPage] = useState(0);
  const [commentAll, setCommentAll] = useState([]);
  const [commentUser, setCommentUser] = useState([]);
  const [commentNews, setCommentNews] = useState([]);
  let i = 0;
  useEffect(() => {
    if(keyTab === "All") {
      setCommentAll(dataAll[page])
    }else if(keyTab === "User") {
      setCommentUser(dataUser[page])
    }else {
      setCommentNews(dataNews[page])
    }
    // setTasks(data[page]);
    // setCount(data.length);
  }, [page, dataAll, dataNews, dataUser]);
  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > dataAll.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = dataAll.length - 1;
      }
      return prevPage;
    });
  };
  const handlePage = (index) => {
    setPage(index);
  };

  return (
    <>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên người dùng</th>
            <th style={{width: "200px"}}>Tin tức</th>
            <th style={{ width: "40%" }}>Nội dung</th>
            <th>Ngày đăng</th>
            <th style={{ width: "40px" }}></th>
          </tr>
        </thead>
        <tbody>
        {keyTab === "All" &&
            commentAll &&
            commentAll
              .map((item) => {
                i++;
                return <CommentList data={item} index={i} />;
              })}
          {keyTab === "User" &&
            commentUser &&
            commentUser
              .map((item) => {
                i++;
                return <CommentList data={item} index={i} />;
              })}
          {keyTab === "News" &&
            commentNews &&
            commentNews
              .map((item) => {
                i++;
                return <CommentList data={item} index={i} />;
              })}
        </tbody>
      </Table>
        <div className="btn-container">
          <button className="prev-btn" onClick={prevPage}>
            Trước
          </button>
          {dataAll.map((item, index) => {
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
            Sau
          </button>
        </div>
    </>
  );
}

export default memo(TableContent);
