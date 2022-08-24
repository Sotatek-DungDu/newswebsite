import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Container } from 'react-bootstrap';
import axios from 'axios';

function FeedbackItem() {
  const [feedback, setFeedback] = useState();
  let params = useParams();
  
  useEffect(() => {
    const setFeedbacks = async () => {
      try {
        const access_token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/feedback/admin/${params.id}`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        setFeedback(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    setFeedbacks();
  },[params.id])
  
  // console.log(feedback)
  return (
    <>
      {feedback && (<div className="my-sm-5 main__content">
      <Container className="px-sm-5">
        <h3 className=""><b>Phản hồi</b> {" #" + params.id}</h3>
        { feedback && (
            <div>
              <h3 className='my-4'><b>{"Tên người dùng : "}</b>{feedback.name}</h3>
              <h4 className='my-4 text-primary' style={{textTransform: 'capitalize',wordBreak : "break-all"}}><b>{"Tiêu đề : "}</b>{feedback.title_feedback}</h4>
              <p className='my-4' style={{wordBreak : "break-all"}}><b>{"Nội dung : "}</b>{feedback.content_feedback}</p>
            </div>
        )}
      </Container>
    </div>)}
    </>
  )
}

export default FeedbackItem