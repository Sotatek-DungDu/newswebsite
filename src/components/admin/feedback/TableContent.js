import React, { memo, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import FeedbackList from "./FeedbackList";

function TableContent({ keyTab, data }) {
  const [page, setPage] = useState(0);
  const [tasks, setTasks] = useState([]);
  let i = 0;
  useEffect(() => {
    setTasks(data[page]);
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

  return (
    <>
      <Table responsive="sm">
        <thead>
          <tr>
            <th style={{width: "5%"}}>#</th>
            <th style={{minWidth: "133px"}}>Tên người dùng</th>
            <th style={{width: "14%"}}>Tiêu đề</th>
            <th style={{width: "30%"}}>Nội dung</th>
            <th style={{ width: "40px" }}></th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks
              .sort((a, b) => (a.id < b.id ? 1 : -1))
              .map((item) => {
                const { isread, isdone } = item;
                if (keyTab === "Read" && isread === true) {
                  i++;
                  return <FeedbackList data={item} index={i} />;
                } else if (
                  keyTab === "Done" &&
                  isdone === true
                ) {
                  i++;
                  return <FeedbackList data={item} index={i} />;
                } else if (keyTab === "All") {
                  i++;
                  return <FeedbackList data={item} index={i} />;
                }
              })}
        </tbody>
      </Table>
      {tasks && tasks.length > 10 && (
        <div className="btn-container">
          <button className="prev-btn" onClick={prevPage}>
            Trước
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
            Tiếp
          </button>
        </div>
      )}
    </>
  );
}

export default memo(TableContent);
