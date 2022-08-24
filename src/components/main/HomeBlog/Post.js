import React, { createContext, useEffect, useState } from "react";
import HomeBlog_SideBar from "./HomeBlog_SideBar";
import Business from "./Business";
import Science from "./Science";
import Entertainment from "./Entertainment";
import axios from "axios";

function Post() {
  const [item1, setItem1] = useState([]);
  const [item2, setItem2] = useState([]);
  const [item3, setItem3] = useState([]);

  useEffect(() => {
    const getdata = (id) => {
      axios
        .get(
          `http://localhost:5000/news/query/get/category?category=${id}&sort=desc`
        )
        .then((res) => {
          setItem1(res.data.data);
        });
    };
    getdata(1);
  }, []);
  useEffect(() => {
    const getdata = (id) => {
      axios
        .get(
          `http://localhost:5000/news/query/get/category?category=${id}&sort=desc`
        )
        .then((res) => {
          setItem2(res.data.data);
        });
    };
    getdata(2);
  }, []);
  useEffect(() => {
    const getdata = (id) => {
      axios
        .get(
          `http://localhost:5000/news/query/get/category?category=${id}&sort=desc`
        )
        .then((res) => {
          setItem3(res.data.data);
        });
    };
    getdata(3);
  }, []);
  return (
    <section className="bg0 p-t-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <Business item={item1} />
            <Science item={item2} />
            <Entertainment item={item3} />
          </div>
          <HomeBlog_SideBar />
        </div>
      </div>
    </section>
  );
}

export default Post;
