import React, { memo, useState, useEffect } from "react";

function ListResultSearch({ data, keyTab }) {
  const [page, setPage] = useState(0);
  const [searchData, setSearchData] = useState({
    comments: [],
    feedbacks: [],
    posts: [],
    advertises: [],
  });
  // let i = 0;
  useEffect(() => {
    if (keyTab === "Post") {
      setSearchData({ ...searchData, posts: data.posts[page] });
    } else if (keyTab === "Comment") {
      setSearchData({ ...searchData, comments: data.comments[page] });
    } else if (keyTab === "Feedback") {
      setSearchData({ ...searchData, feedbacks: data.feedbacks[page] });
    } else {
      setSearchData({ ...searchData, advertises: data.advertises[page] });
    }
    // setTasks(data[page]);
    // setCount(data.length);
  }, [page, keyTab, data]);

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (keyTab === "Post" && nextPage > data.posts.length - 1) {
        nextPage = 0;
      } else if (keyTab === "Comment" && nextPage > data.comments.length - 1) {
        nextPage = 0;
      } else if (
        keyTab === "Feedback" &&
        nextPage > data.feedbacks.length - 1
      ) {
        nextPage = 0;
      } else if (
        keyTab === "Advertise" &&
        nextPage > data.advertises.length - 1
      ) {
        nextPage = 0;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      // if (prevPage < 0) {
      //   prevPage = dataAll.length - 1;
      // }
      if (keyTab === "Post" && prevPage < 0) {
        prevPage = data.posts.length - 1;
      } else if (keyTab === "Comment" && prevPage < 0) {
        prevPage = data.comments.length - 1;
      } else if (keyTab === "Feedback" && prevPage < 0) {
        prevPage = data.feedbacks.length - 1;
      } else if (keyTab === "Advertise" && prevPage < 0) {
        prevPage = data.advertises.length - 1;
      }
      return prevPage;
    });
  };
  const handlePage = (index) => {
    setPage(index);
  };
  // console.log(searchData)

  return (
    <>
      {searchData.posts &&
        searchData.comments &&
        searchData.feedbacks &&
        searchData.advertises && (
          <>
            <div className="px-lg-3">
              {keyTab === "Post" &&
                searchData.posts.map((post, key) => {
                  const { title_news, title_quote, content_news, id } = post;
                  return (
                    <a key={key} href={`/admin/posts/${id}`}>
                      <h3 className="py-1"><b>{"Tin tức #"}</b>{id}</h3>
                      <h4 className="py-1"><b>{"Tiêu đề : "}</b>{title_news}</h4>
                      <h5 className="py-1 wrap__text"><b>{"Trích dẫn : "}</b>{title_quote}</h5>
                      <p className="py-1 wrap__text" style={{ wordBreak: "break-all",color: "#000"}}>
                      <b>{"Nội dung : "}</b>{content_news}
                      </p>
                    </a>
                  );
                })}
              {keyTab === "Comment" &&
                searchData.comments.map((comment, key) => {
                  const { content, id } = comment;
                  return (
                    <a key={key} href={`/admin/comments/${id}`}>
                      <h3 className="py-1"><b>{"Bình luận #"}</b>{id}</h3>
                      {/* <h4>{"Title News : " + title_news}</h4> */}
                      {/* <h5>{"Title Quote : " + title_quote}</h5> */}
                      <p className="py-1 wrap__text" style={{ wordBreak: "break-all", color: "#000" }}>
                      <b>{"Nội dung : "}</b>{content}
                      </p>
                    </a>
                  );
                })}
              {keyTab === "Feedback" &&
                searchData.feedbacks.map((feedback, key) => {
                  const { title_feedback, name, content_feedback, id } = feedback;
                  return (
                    <a key={key} href={`/admin/feedbacks/${id}`}>
                      <h3 className="py-1"><b>{"Phản hồi #"}</b>{id}</h3>
                      <h4 className="py-1"><b>{"Tiêu đề : "}</b>{title_feedback}</h4>
                      <h5 className="py-1"><b>{"Tên người dùng : "}</b>{name}</h5>
                      <p style={{ wordBreak: "break-all", color: "#000" }} className="py-1 wrap__text">
                        <b>{"Nội dung : "}</b>{content_feedback}
                      </p>
                    </a>
                  );
                })}
              {keyTab === "Advertise" &&
                searchData.advertises.map((advertise, key) => {
                  const { title_advertise, id } = advertise;
                  return (
                    <a key={key} href={`/admin/advertisement`}>
                      <h3 className="py-1"><b>{"Quảng cáo #"}</b>{id}</h3>
                      <h5 className="py-1"><b>{"Tiêu đề : "}</b>{title_advertise}</h5>
                    </a>
                  );
                })}
            </div>
            <div className="btn-container">
              <button className="prev-btn" onClick={prevPage}>
                Trước
              </button>
              {keyTab === "Post" &&
                data.posts.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={`page-btn ${
                        index === page ? "active-btn" : null
                      }`}
                      onClick={() => handlePage(index)}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              {keyTab === "Comment" &&
                data.comments.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={`page-btn ${
                        index === page ? "active-btn" : null
                      }`}
                      onClick={() => handlePage(index)}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              {keyTab === "Feedback" &&
                data.feedbacks.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={`page-btn ${
                        index === page ? "active-btn" : null
                      }`}
                      onClick={() => handlePage(index)}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              {keyTab === "Advertise" &&
                data.advertises.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={`page-btn ${
                        index === page ? "active-btn" : null
                      }`}
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
        )}
    </>
  );
}

export default memo(ListResultSearch);
