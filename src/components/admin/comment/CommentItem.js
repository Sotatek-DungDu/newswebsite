import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";

function CommentItem() {
  const [comment, setComment] = useState();
  let params = useParams();
  const [name, setName] = useState();
  const [news, setNews] = useState();

  useEffect(() => {
    const getComments = async () => {
      try {
        const access_token = localStorage.getItem("token");
        const comments = await axios.get(`http://localhost:5000/news/cmt`);
        comments.data.forEach((comment) => {
          if (comment.id === parseInt(params.id)) {
            setComment(comment);
            (async () => {
              const resp = await axios.get(
                `http://localhost:5000/auth/${comment.id_user}`,
                {
                  headers: { Authorization: `Bearer ${access_token}` },
                }
              );
              const res = await axios.get(
                `http://localhost:5000/news/${comment.id_news}`,
                {
                  headers: { Authorization: `Bearer ${access_token}` },
                }
              );
              setName(resp.data.username);
              setNews(res.data.title_news);
            })();
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [params.id]);

  return (
    <>
      {comment && (<div className="my-sm-5 main__content">
    <Container className="px-sm-5">
      <h3 className=""><b>Bình luận </b>{"#" + params.id}</h3>
      {comment && (
        <div>
          <h3 className="my-4"><b>{"Tên người dùng : "}</b>{name}</h3>
          <h4
            className="my-4 text-primary"
            style={{ textTransform: "capitalize", wordBreak : "break-all" }}
          >
           <b>{"Tin tức : "}</b>
            {news}
          </h4>
          <p className="my-4" style={{wordBreak : "break-all"}}><b>{"Nội dung : "}</b>{comment.content}</p>
        </div>
      )}
    </Container>
  </div>)}
    </>
  );
}

export default CommentItem;
