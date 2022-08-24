import React from "react";
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";

function Science(props) {
  const { item } = props;
  const firstItem = item[0];
  const items = item.slice(1, 4);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [classify, setClassify] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams()
  useEffect(async () => {
    const response = await fetch(`http://localhost:5000/category`);
    const data = await response.json();
    let catess = [];
    for (const item of data) {
      const calsss = await fetch(
        `http://localhost:5000/classify/category/${item.id}`
      );
      const dataCalsss = await calsss.json();
      catess.push({
        name: item.name_category,
        classify: dataCalsss,
      });
    }
    setCategories(catess);
    const cate_news = await fetch(`http://localhost:5000/news/query/get/category?category=${params.id}&sort=desc`)
    const db = await cate_news.json();

  }, []);
  const cate1 = categories.slice(1, 2)
  return (
    <div className="tab01 p-b-20">
      {cate1.map((cate) => {
        return (
          <div className="tab01-head how2 how2-cl1 bocl12 flex-s-c m-r-10 m-r-0-sr991">
            <h3 className="f1-m-2 cl12 tab01-title zzzz">{cate.name}</h3>
            <ul className="nav nav-tabs" role="tablist">
              {cate.classify.map((item) => (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    data-toggle="tab"
                    to={"/category/" + item.id}
                    role="tab"
                  >
                    {item.name_classify}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        );
      })}

      <div className="tab-content p-t-35">
        {/* - */}
        <div className="tab-pane fade show active" id="tab1-1" role="tabpanel">
          <div className="row">
            {firstItem && (
              <div className="col-sm-6 p-r-25 p-r-15-sr991">
                {/* Item post */}
                <div className="m-b-30">
                  <Link
                    to={`bloglist/${firstItem.id}`}
                    className="wrap-pic-w hov1 trans-03"
                  >
                    {firstItem.img_quote && (
                      <img
                        src={firstItem.img_quote.replace(
                          "uploads\\newsimages\\",
                          "http://localhost:5000/newsimages/"
                        )}
                        alt="IMG"
                      />
                    )}
                  </Link>
                  <div className="p-t-20">
                    <h5 className="p-b-5">
                      <Link
                        to={`bloglist/${item.id}`}
                        className="f1-m-3 cl2 hov-cl10 trans-03"
                      >
                        {firstItem.title_news}
                      </Link>
                    </h5>
                    <span className="cl8">
                      <Link
                        to={`bloglist/${item.id}`}
                        className="f1-s-4 cl8 hov-cl10 trans-03"
                      >
                        {firstItem.title_quote}
                      </Link>
                      <span className="f1-s-3 m-rl-3">-</span>
                      <span className="f1-s-3">{firstItem.date_posted}</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="col-sm-6 p-r-25 p-r-15-sr991">
              {/* Item post */}
              {items.length > 0 &&
                items.map((item, i) => {
                  return (
                    <div className="flex-wr-sb-s m-b-30">
                      <Link
                        to={`bloglist/${item.id}`}
                        className="size-w-1 wrap-pic-w hov1 trans-03"
                      >
                        {item.img_quote && (
                          <img
                            src={item.img_quote.replace(
                              "uploads\\newsimages\\",
                              "http://localhost:5000/newsimages/"
                            )}
                            alt="IMG"
                          />
                        )}
                      </Link>
                      <div className="size-w-2">
                        <h5 className="p-b-5">
                          <Link
                            to={`bloglist/${item.id}`}
                            className="f1-s-5 cl3 hov-cl10 trans-03"
                          >
                            {item.title_news}
                          </Link>
                        </h5>
                        <span className="cl8">
                          <Link
                            to={`bloglist/${item.id}`}
                            className="f1-s-6 cl8 hov-cl10 trans-03"
                          >
                            {item.title_quote}
                          </Link>
                          <span className="f1-s-3 m-rl-3">-</span>
                          <span className="f1-s-3">{item.date_posted}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Science