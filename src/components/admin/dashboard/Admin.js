import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../../assets/css/maincontent.css";
import CountQuantum from "./CountQuantum";
import LineChart from "./LineChart";
import TableUser from "./TableUser";
import TableNews from "./TableNews";
import { useNavigate } from "react-router-dom";

function Admin() {
  const UserData = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823,
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345,
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555,
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555,
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
    },
  ];

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  // const handleClick = () => {
  //   navigate("/admin/news");
  // };

  return (
    <div className="my-sm-5 main__content">
      <Container className="ps-sm-2 mb-sm-3" fluid>
        <h3 className="d-block px-sm-5">Bảng điều khiển</h3>
        <Row>
          <Row className="px-lg-5 mx-0 py-3 justify-content-around">
            <Col lg={6} className="ps-lg-0">
              <CountQuantum />
            </Col>
            <Col lg={6} className="mt-5 mt-lg-0 shadow-lg py-3 rounded">
              <LineChart chartData={userData} />
            </Col>
          </Row>
          <Row className="mx-0 justify-content-sm-around">
            <Col
              sm={4}
              className="shadow-lg mt-sm-3 d-flex flex-column justify-content-center rounded"
            >
              <h4 className="text-center py-3"><b>Người dùng mới</b></h4>
              <TableUser />
              <button className="btn btn-light py-3" onClick={() => navigate('/admin/users')}>Xem tất cả</button>
            </Col>
            <Col sm={7} className="shadow-lg mt-3 d-flex flex-column justify-content-center rounded">
              <h4 className="text-center py-3"><b>Bài viết mới</b></h4>
              <div className="table__scroll">
                <TableNews />
              </div>
              <button className="btn btn-light py-3" onClick={() => navigate('/admin/posts')}>Xem tất cả</button>
              {/* <button className="btn btn-warning w-50" onClick={handleClick}>
                See Detail
              </button> */}
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
}

export default Admin;
