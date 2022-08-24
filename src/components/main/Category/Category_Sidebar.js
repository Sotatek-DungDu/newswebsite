import banner from '../../../assets/images/banner-02.jpg'
import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-slideshow-image/dist/styles.css";
function Category_Sidebar() {
  const [mostPopular, setMostpopular] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      await axios.get(`http://localhost:5000/news`).then((res) => {
        setMostpopular(res.data.slice(0, 5));
      });
    };
    getdata();
  }, [])

  return (
    <div className="col-md-10 col-lg-4 p-b-80">
      <div className="p-l-10 p-rl-0-sr991">
        {/* Subscribe */}
        <div className="bg10 p-rl-35 p-t-28 p-b-35 m-b-50">
          <h5 className="f1-m-5 cl0 p-b-10">
            Subscribe
          </h5>
          <p className="f1-s-1 cl0 p-b-25">
            Get all latest content delivered to your email a few times a month.
          </p>
          <form className="size-a-9 pos-relative">
            <input className="s-full f1-m-6 cl6 plh9 p-l-20 p-r-55" type="text" name="email" placeholder="Email" />
            <button className="size-a-10 flex-c-c ab-t-r fs-16 cl9 hov-cl10 trans-03">
              <i className="fa fa-arrow-right" />
            </button>
          </form>
        </div>
        {/* Most Popular */}
        <div className="p-b-23">
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
        <div className="flex-c-s p-b-50">
          <a href="#">
            <img className="max-w-full" src={banner} alt="IMG" />
          </a>
        </div>
        {/* Tag */}
        <div>
          <div className="how2 how2-cl4 flex-s-c m-b-30">
            <h3 className="f1-m-2 cl3 tab01-title">
              Tags
            </h3>
          </div>
          <div className="flex-wr-s-s m-rl--5">
            <a href="#" className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
              Fashion
            </a>
            <a href="#" className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
              Lifestyle
            </a>
            <a href="#" className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
              Denim
            </a>
            <a href="#" className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
              Streetstyle
            </a>
            <a href="#" className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
              Crafts
            </a>
            <a href="#" className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
              Magazine
            </a>
            <a href="#" className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
              News
            </a>
            <a href="#" className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
              Blogs
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category_Sidebar