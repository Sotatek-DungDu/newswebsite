import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import blog from "../../../../assets/images/blog-list-01.jpg";
import { Link, useParams } from "react-router-dom";
function BlogContent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [news, setNews] = useState();
  const params = useParams();

  useEffect(async () => {
    await axios
      .get(`http://localhost:5000/news/${params.id}`)
      .then(
        (result) => {
          setIsLoaded(true);
          setNews(result.data);
          console.log("news :", result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }
      );
    console.log("params", params);
    console.log("news :", news);
  }, []);

  return (
    <React.Fragment>
      {news == null || news == undefined ? (
        ""
      ) : (

        <div className="flex-col-s-c how-bor2 p-t-65 p-b-40" key="ddd">
          <Link
            to="/category"
            className="f1-s-10 cl2 text-uppercase txt-center hov-cl10 trans-03 p-b-40"
          >
            {news.category}
          </Link>
          <h5 className="p-b-17 txt-center">
            <Link
              to="/blogdetail"
              className="f1-l-1 cl2 hov-cl10 trans-03 respon2"
            >
              {news.title_news}
            </Link>
          </h5>
          <div className="cl8 txt-center p-b-24">
            <a href="#" className="f1-s-4 cl8 hov-cl10 trans-03">
              {news.author}
            </a>
            <span className="f1-s-3 m-rl-3">-</span>
            <span className="f1-s-3">{news.date_posted}</span>
          </div>
          <a href="#" className="wrap-pic-w hov1 trans-03 m-b-30">
            <img src={(news.img_quote).replace('uploads', 'http://localhost:5000/')} style={{ width: '750px' }} alt="IMG" />
          </a>
          <p className="f1-s-11 cl6 txt-center p-b-22">{news.content_news}</p>
        </div>
      )}
    </React.Fragment>
  );
}

export default BlogContent;
