import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function HomeBlog_SideBar() {
  const [mostPopular, setMostpopular] = useState([]);
  const [images, setImages] = useState([]);
  const [avd, setAvd] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      await axios.get(`http://localhost:5000/news`).then((res) => {
        setMostpopular(res.data.slice(0, 5));
      });
    };
    getdata();

    const getImage = async () => {
      await axios.get(`http://localhost:5000/adv`).then((res) => {
        if (res && res.data) {
          setImages(res.data);
        }
      });
    };

    getImage();

    const getAvd = async () => {
      await axios.get(`http://localhost:5000/adv`).then((res) => {
        setAvd(res);
      });
    };
    getAvd();
  }, []);

  console.log("avd", avd);

  return (
    <div className="col-md-10 col-lg-4">
      <div className="p-l-10 p-rl-0-sr991 p-b-20">
        {/*  */}
        <div>
          <div className="how2 how2-cl4 flex-s-c">
            <h3 className="f1-m-2 cl3 tab01-title">Thông tin phổ biến</h3>
          </div>
          <ul className="p-t-35">
            {mostPopular.length > 0 &&
              mostPopular.map((item, i) => {
                return (
                  <li key={item.id} className="flex-wr-sb-s p-b-22">
                    <div className="size-a-8 flex-c-c borad-3 size-a-8 bg9 f1-m-4 cl0 m-b-6">
                      {i}
                    </div>
                    <Link
                      to={`/bloglist/${item.id}`}
                      className="size-w-3 f1-s-7 cl3 hov-cl10 trans-03"
                    >
                      {item.title_quote}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        {/*  */}
        <Fade>
          {images?.map((image, index) => (
            <div className="each-fade">
              <img key={index} className="max-w-full" src={image.img_advertise.replace("uploads\\advimages\\",
                "http://localhost:5000/advimages/")} alt="IMG" />
              <h2 style={{ textAlign: "center" }}>{image.title_advertise}</h2>
            </div>
          ))}
        </Fade>
        {/*  */}
        <div className="p-b-55">
          <div className="how2 how2-cl4 flex-s-c m-b-30">
            <h3 className="f1-m-2 cl3 tab01-title">Tags</h3>
          </div>
          <div className="flex-wr-s-s m-rl--5">
            <a
              href="#"
              className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5"
            >
              Fashion
            </a>
            <a
              href="#"
              className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5"
            >
              Lifestyle
            </a>
            <a
              href="#"
              className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5"
            >
              Denim
            </a>
            <a
              href="#"
              className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5"
            >
              Streetstyle
            </a>
            <a
              href="#"
              className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5"
            >
              Crafts
            </a>
            <a
              href="#"
              className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5"
            >
              Magazine
            </a>
            <a
              href="#"
              className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5"
            >
              News
            </a>
            <a
              href="#"
              className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5"
            >
              Blogs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBlog_SideBar;
