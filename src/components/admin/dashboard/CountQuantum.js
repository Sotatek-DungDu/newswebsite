import React, {useState, useEffect} from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { FaUserAlt, FaNewspaper, FaCommentAlt } from "react-icons/fa";
import {FcFeedback} from "react-icons/fc";
import axios from 'axios';
function CountQuantum() {
  const [count,setCount] = useState({countUser: 0,countNews: 0, countComment: 0, countFeedback: 0})
  useEffect(() => {
    const getData = async () => {
      try {
        const access_token = localStorage.getItem("token");
      const comments = await axios.get(`http://localhost:5000/news/cmt`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
      const users = await axios.get(`http://localhost:5000/auth/admin`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const news = await axios.get(`http://localhost:5000/news`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const feedbacks = await axios.get(`http://localhost:5000/feedback/admin`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      setCount({countUser: users.data.length,countNews: news.data.length, countComment: comments.data.length, countFeedback: feedbacks.data.length})
      } catch (error) {
        console.log(error)
      }
    }
    getData();
  },[])
  return (
    <>
        <Row className="g-3">
                <Col sm={6} className="d-flex justify-content-center">
                  <Card
                    className="rounded shadow-lg flex-row hover__card"
                    style={{ width: "20rem" }}
                  >
                    <Card.Header className='py-lg-5 py-3' style={{width: "35%"}}>
                      <FaUserAlt className="w-100 h-100" />
                    </Card.Header>
                    <Card.Body className='py-lg-5 py-3'>
                      <Card.Title><h3>{count.countUser}</h3></Card.Title>
                      <Card.Text>
                      <p>Tổng số người dùng</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={6} className="d-flex justify-content-center">
                  <Card
                    // border="primary"
                    className="rounded shadow-lg flex-row hover__card"
                    style={{ width: "20rem" }}
                  >
                    <Card.Header className='py-lg-5 py-3' style={{width: "35%"}}>
                      <FaNewspaper className="w-100 h-100" />
                    </Card.Header>
                    <Card.Body className='py-lg-5 py-3'>
                      <Card.Title><h3>{count.countNews}</h3></Card.Title>
                      <Card.Text>
                        <p>Tổng số tin tức</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={6} className="d-flex justify-content-center">
                  <Card
                    // border="primary"
                    className="rounded shadow-lg flex-row hover__card"
                    style={{ width: "20rem" }}
                  >
                    <Card.Header className='py-lg-5 py-3' style={{width: "35%"}}>
                      <FaCommentAlt className="w-100 h-100" />
                    </Card.Header>
                    <Card.Body className='py-lg-5 py-3'>
                      <Card.Title><h3>{count.countComment}</h3></Card.Title>
                      <Card.Text>
                        <p>Tổng số bình luận</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={6} className="d-flex justify-content-center">
                  <Card
                    // border="primary"
                    className="rounded shadow-lg flex-row hover__card"
                    style={{ width: "20rem" }}
                  >
                    <Card.Header className='py-lg-5 py-3' style={{width: "35%"}}>
                      <FcFeedback className="w-100 h-100" />
                    </Card.Header>
                    <Card.Body className='py-lg-5 py-3'>
                      <Card.Title><h3>{count.countFeedback}</h3></Card.Title>
                      <Card.Text>
                        <p>Tổng số phản hồi</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
    </>
  )
}

export default CountQuantum