import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function FeaturePost() {
  const [post1, setPost1] = useState({});
  const [post2, setPost2] = useState({});
  const [post3, setPost3] = useState({});
  const [post4, setPost4] = useState({});
  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);
  const [category4, setCategory4] = useState([]);

  const [features, setFeatures] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getData = async (id) => {
      await axios
        .get(
          `http://localhost:5000/news/query/getone/category/?category=${id}&sort=desc`
        )
        .then((resp) => {
          setPost1(resp.data.data[0]);
          console.log("post1", post1);
          axios
            .get(
              `http://localhost:5000/category/${resp.data.data[0].id_category}`
            )
            .then((resp) => {
              setCategory1(resp);
            });
        });
    };

    getData(1);
  }, []);
  useEffect(() => {
    const getData = async (id) => {
      await axios
        .get(
          `http://localhost:5000/news/query/getone/category/?category=${id}&sort=desc`
        )
        .then((resp) => {
          setPost2(resp.data.data[0]);
          axios
            .get(
              `http://localhost:5000/category/${resp.data.data[0].id_category}`
            )
            .then((resp) => {
              setCategory2(resp);
            });
        });
    };

    getData(2);
  }, []);

  useEffect(() => {
    const getData = async (id) => {
      await axios
        .get(
          `http://localhost:5000/news/query/getone/category/?category=${id}&sort=desc`
        )
        .then((resp) => {
          setPost3(resp.data.data[0]);
          axios
            .get(
              `http://localhost:5000/category/${resp.data.data[0].id_category}`
            )
            .then((resp) => {
              setCategory3(resp);
            });
        });
    };

    getData(3);
  }, []);

  useEffect(() => {
    const getData = async (id) => {
      await axios
        .get(
          `http://localhost:5000/news/query/getone/category/?category=${id}&sort=desc`
        )
        .then((resp) => {
          setPost4(resp.data.data[0]);
          axios
            .get(
              `http://localhost:5000/category/${resp.data.data[0].id_category}`
            )
            .then((resp) => {
              setCategory4(resp);
            });
        });
    };

    getData(4);
  }, []);

  return (
    <section className="bg0">
      <div className="container">
        <div className="row m-rl--1" style={{ marginTop: '2rem' }}>
          {post1 && (
            <div className="col-md-6 p-rl-1 p-b-2">
              <div
                className="bg-img1 size-a-3 how1 pos-relative"
                style={
                  post1.img_quote
                    ? {
                      backgroundImage: `url(${post1.img_quote.replace(
                        "uploads\\newsimages\\",
                        "http://localhost:5000/newsimages/"
                      )})`,
                    }
                    : {}
                }
              >
                <a href="#" className="dis-block how1-child1 trans-03" />
                <div className="flex-col-e-s s-full p-rl-25 p-tb-20">
                  <Link
                    to={`/category/${post1.id_category}`}
                    className="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2"
                  >
                    {category1?.data?.name_category}
                  </Link>
                  <h3 className="how1-child2 m-t-14 m-b-10">
                    <Link
                      to={`/blogdetailcontent/${post1.id}`}
                      className="how-txt1 size-a-6 f1-l-1 cl0 hov-cl10 trans-03"
                    >
                      {post1.title_news}
                    </Link>
                  </h3>
                  {/* <span className="how1-child2">
                    <span className="f1-s-4 cl11">{item.author}</span>
                    <span className="f1-s-3 cl11 m-rl-3">-</span>
                    <span className="f1-s-3 cl11">{item.createAt}</span>
                  </span> */}
                </div>
              </div>
            </div>
          )}

          <div className="col-md-6 p-rl-1">
            <div className="row m-rl--1">
              <div className="col-12 p-rl-1 p-b-2">
                <div
                  className="bg-img1 size-a-4 how1 pos-relative"
                  style={
                    post2.img_quote
                      ? {
                        backgroundImage: `url(${post2.img_quote.replace(
                          "uploads\\newsimages\\",
                          "http://localhost:5000/newsimages/"
                        )})`,
                      }
                      : {}
                  }
                >
                  <a href="#" className="dis-block how1-child1 trans-03" />
                  <div className="flex-col-e-s s-full p-rl-25 p-tb-24">
                    <Link
                      to={`/category/${post2.id_category}`}
                      className="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2"
                    >
                      {category2?.data?.name_category}
                    </Link>
                    <h3 className="how1-child2 m-t-14">
                      <Link
                        to={`/blogdetailcontent/${post2.id}`}
                        className="how-txt1 size-a-7 f1-l-2 cl0 hov-cl10 trans-03"
                      >
                        {post2.title_news}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 p-rl-1 p-b-2">
                <div
                  className="bg-img1 size-a-5 how1 pos-relative"
                  style={
                    post3.img_quote
                      ? {
                        backgroundImage: `url(${post3.img_quote.replace(
                          "uploads\\newsimages\\",
                          "http://localhost:5000/newsimages/"
                        )})`,
                      }
                      : {}
                  }
                >
                  <a href="#" className="dis-block how1-child1 trans-03" />
                  <div className="flex-col-e-s s-full p-rl-25 p-tb-20">
                    <Link
                      to={`/category/${post3.id_category}`}
                      className="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2"
                    >
                      {category3?.data?.name_category}
                    </Link>
                    <h3 className="how1-child2 m-t-14">
                      <Link
                        to={`/blogdetailcontent/${post3.id}`}
                        className="how-txt1 size-h-1 f1-m-1 cl0 hov-cl10 trans-03"
                      >
                        {post3.title_news}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 p-rl-1 p-b-2">
                <div
                  className="bg-img1 size-a-5 how1 pos-relative"
                  style={
                    post4.img_quote
                      ? {
                        backgroundImage: `url(${post4.img_quote.replace(
                          "uploads\\newsimages\\",
                          "http://localhost:5000/newsimages/"
                        )})`,
                      }
                      : {}
                  }
                >
                  <a href="#" className="dis-block how1-child1 trans-03" />
                  <div className="flex-col-e-s s-full p-rl-25 p-tb-20">
                    <Link
                      to={`/category/${post4.id_category}`}
                      className="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2"
                    >
                      {category4.data?.name_category}
                    </Link>
                    <h3 className="how1-child2 m-t-14">
                      <Link
                        to={`/blogdetailcontent/${post4.id}`}
                        className="how-txt1 size-h-1 f1-m-1 cl0 hov-cl10 trans-03"
                      >
                        {post4.title_news}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturePost;
