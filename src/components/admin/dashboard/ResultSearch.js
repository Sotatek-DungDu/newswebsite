import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Tabs, Tab, Badge } from "react-bootstrap";
import axios from "axios";
import _ from "lodash";
import ListResultSearch from "./ListResultSearch";
import { titleTabSearch } from "context/constants";
import paginate from "context/utils";

function ResultSearch() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [countData, setCountData] = useState([0, 0, 0, 0]);
  const [dataSearch, setDataSearch] = useState({
    comments: [],
    feedbacks: [],
    posts: [],
    advertises: [],
  });
  let filter = searchParams.get("filter");

  useEffect(() => {
    const getData = async () => {
      try {
        const access_token = localStorage.getItem("token");
        const posts = await axios.get(`http://localhost:5000/news`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        const feedbacks = await axios.get(
          `http://localhost:5000/feedback/admin`,
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );
        const comments = await axios.get(`http://localhost:5000/news/cmt`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        const advertises = await axios.get(`http://localhost:5000/adv`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (
          filter &&
          posts.data &&
          feedbacks.data &&
          comments.data &&
          advertises.data
        ) {
          const valuePosts = _.filter(posts.data, function (o) {
            return (
              o.title_news.includes(filter) ||
              o.title_quote.includes(filter) ||
              o.content_news.includes(filter)
            );
          });
          const valueFeedbacks = _.filter(feedbacks.data, function (o) {
            return (
              o.title_feedback.includes(filter) ||
              o.content_feedback.includes(filter) ||
              o.name.includes(filter)
            );
          });
          const valueComments = _.filter(comments.data, function (o) {
            return o.content.includes(filter);
          });
          const valueAdvertises = _.filter(advertises.data, function (o) {
            return o.title_advertise.includes(filter);
          });
          setDataSearch({
            posts: paginate(valuePosts),
            feedbacks: paginate(valueFeedbacks),
            comments: paginate(valueComments),
            advertises: paginate(valueAdvertises),
          });
          setCountData([
            valuePosts.length,
            valueComments.length,
            valueFeedbacks.length,
            valueAdvertises.length,
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [filter]);

  return (
    <>
      {filter ? (
        <div className="py-sm-5 main__content">
          <Container className="px-sm-2 position-relative">
            {dataSearch.posts ||
            dataSearch.advertises ||
            dataSearch.feedbacks ||
            dataSearch.comments ? (
              <>
                <h3 className="d-block px-sm-4 mb-4">Tất cả giá trị</h3>
                <Tabs
                  variant="pills"
                  id="controlled-tab"
                  defaultActiveKey="Post"
                  className="mb-3 px-sm-4 mt-4"
                >
                  {titleTabSearch.map((tab, key) => {
                    const titleTab = (
                      <h6 className="d-block mb-0">
                        {tab.title}
                        <Badge bg="danger" className="p-1 ms-1">
                          <small>{countData[key]}</small>
                        </Badge>
                      </h6>
                    );
                    return (
                      <Tab key={key} eventKey={tab.tab} title={titleTab}>
                        <ListResultSearch keyTab={tab.tab} data={dataSearch} />
                      </Tab>
                    );
                  })}
                </Tabs>
              </>
            ) : (
              <p>Không có giá trị cho: {filter}.</p>
            )}
          </Container>
        </div>
      ) : (
        <p className="main__content ms-md-4 mt-md-5">
          Nhập ít nhật 1 ký tự để tìm kiếm
        </p>
      )}
    </>
  );
}

export default ResultSearch;
