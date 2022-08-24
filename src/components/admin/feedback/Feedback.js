import React, { useState, useEffect } from "react";
import { Container, Tab, Tabs, Badge } from "react-bootstrap";
import TableContent from "./TableContent";
import { titleTabFeedback } from "../../../context/constants";
import axios from "axios";
import paginate from "context/utils";
import exportDefault from "redux/action";
import { useDispatch, useSelector } from "react-redux";

function Feedback() {
  const [count, setCount] = useState([0, 0, 0]);
  const [feedbacks, setFeedbacks] = useState([]);
  const dispatch = useDispatch();
  const listFeedback = useSelector((state) => state.feedbacks);

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const access_token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/feedback/admin`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        dispatch(exportDefault.setFeedbacks(res.data.sort((a, b) => (a.id < b.id ? 1 : -1))))
        // setFeedbacks(paginate(res.data.sort((a, b) => (a.id < b.id ? 1 : -1))))
        let i = 0;
        let j = 0;
        res.data.map((element) => {
          if (element.isread === true) {
            i++;
          }
          if (element.isdone === true) {
            j++;
          }
        });
        setCount([res.data.length, i, j]);
      } catch (error) {
        console.log(error);
      }
    };
    getFeedbacks();
  }, [dispatch, listFeedback.loading]);

  useEffect(() => {
    setFeedbacks(paginate(listFeedback.listFeedback));
  }, [listFeedback.listFeedback]);
  return (
    <div className="my-sm-5 main__content">
      <Container className="px-sm-2" fluid>
        <h3 className="px-sm-4">Phản hồi</h3>
        <Tabs
          variant="pills"
          id="controlled-tab"
          defaultActiveKey="All"
          className="mb-3 px-sm-4 mt-4"
        >
          {titleTabFeedback.map((tab, key) => {
            const titleTab = (
              <h6 className="d-block mb-0">
                {tab.title}
                <Badge bg="danger" className="p-1 ms-1">
                  <small>{count[key]}</small>
                </Badge>
              </h6>
            );
            return (
              <Tab key={key} eventKey={tab.tab} title={titleTab}>
                <TableContent
                  keyTab={tab.tab}
                  setCount={setCount}
                  data={feedbacks}
                />
              </Tab>
            );
          })}
        </Tabs>
        {/* <TableContent className="mt-2" data={dataTable} /> */}
      </Container>
    </div>
  );
}

export default Feedback;
