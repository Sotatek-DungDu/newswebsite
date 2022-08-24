import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const SIdebarMostPopular = () => {
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
    <>
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
    </>
  );
};

export default SIdebarMostPopular;
