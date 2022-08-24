import React, { useState, useEffect } from "react";
import { Container, Tab, Tabs, Badge } from "react-bootstrap";
import TableContent from "./TableContent";
import { titleTabComment } from "../../../context/constants";
import axios from "axios";
import paginate from "context/utils";
import { useDispatch, useSelector } from "react-redux";
import exportDefault from "redux/action";

function Comment() {
  const [count, setCount] = useState(0);
  const [dataAll, setDataAll] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [dataNews, setDataNews] = useState([]);
  const dispatch = useDispatch();
  const listComment = useSelector(state => state.comments);
  
  useEffect(() => {
    const getData = async () => {
      const access_token = localStorage.getItem("token");
      const responsive = await axios.get(`http://localhost:5000/news/cmt`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
      dispatch(exportDefault.setComments(responsive.data));
      //  setDataUser(paginate(responsive.data.sort((a, b) => (a.id_user === b.id_user ? 0 : a.id_user > b.id_user ? 1 : -1))))
      //  setDataNews(paginate(responsive.data.sort((a, b) => (a.id_news === b.id_news ? 0 : a.id_news > b.id_news ? 1 : -1))))
      //  setDataAll(paginate(responsive.data.sort((a, b) => (a.id < b.id ? 1 : -1))))
      setCount(responsive.data.length)
    }
    getData();
  },[dispatch, listComment.loading])

  useEffect(() => {
     setDataUser(paginate(listComment.listComment.sort((a, b) => (a.id_user === b.id_user ? 0 : a.id_user > b.id_user ? 1 : -1))))
       setDataNews(paginate(listComment.listComment.sort((a, b) => (a.id_news === b.id_news ? 0 : a.id_news > b.id_news ? 1 : -1))))
       setDataAll(paginate(listComment.listComment.sort((a, b) => (a.id < b.id ? 1 : -1))))
  },[listComment.listComment])
  return (
    <div className="my-sm-5 main__content">
      <Container className="px-sm-2" fluid>
        <h3 className="px-sm-4">Bình luận</h3>
        <Tabs
          variant="pills"
          id="controlled-tab"
          defaultActiveKey="All"
          // onSelect={(k) => setKey(k)}
          className="mb-3 px-sm-4 mt-4"
        >
          {titleTabComment.map((tab, key) => {
            const titleTab = (
              <h6 className="d-block mb-0">
                {tab.title}
                <Badge bg="danger" className="p-1 ms-1">
                  <small>{count}</small>
                </Badge>
              </h6>
            );
            return (
              <Tab key={key} eventKey={tab.tab} title={titleTab}>
                <TableContent keyTab={tab.tab} dataAll={dataAll} dataUser={dataUser} dataNews={dataNews}/>
              </Tab>
            );
          })}
        </Tabs>
      </Container>
    </div>
  );
}

export default Comment;
