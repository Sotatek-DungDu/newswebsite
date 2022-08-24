import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import image1 from "../../../assets/images/entertaiment-06.jpg";
import image2 from "../../../assets/images/entertaiment-17.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

function Category_PostImages() {
  const params = useParams();
  const [newsList, setNewsList] = useState();
  const [first, setFirst] = useState();

  useEffect(async () => {
    await axios.get(`http://localhost:5000/news/category/${params.id}`).then(
      (result) => {
        setNewsList(result.data);
        setFirst(result.data[0]);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <section className="bg0">
      <div className="container">
        <div className="row m-rl--1">
          {!first ? (
            ""
          ) : (
            <div className="col-12 p-rl-1 p-b-2">
              <div
                className="bg-img1 size-a-3 how1 pos-relative"
                style={{
                  backgroundImage: `url(${first.img_quote.replace(
                    "uploads\\newsimages\\",
                    "http://localhost:5000/newsimages/"
                  )})`,
                }}
              >
                <a href="#" className="dis-block how1-child1 trans-03" />
                <div className="flex-col-e-s s-full p-rl-25 p-tb-20">
                  <h3 className="how1-child2 m-t-14 m-b-10">
                    <Link
                      to={`/blogdetail/${first.id}`}
                      className="how-txt1 size-a-6 f1-l-1 cl0 hov-cl10 trans-03"
                    >
                      {first.title_news}
                    </Link>
                  </h3>
                  {/* <span className="how1-child2">
                    <span className="f1-s-4 cl11">Jack Sims</span>
                    <span className="f1-s-3 cl11 m-rl-3">-</span>
                    <span className="f1-s-3 cl11">Feb 16</span>
                  </span> */}
                </div>
              </div>
            </div>
          )}

          {!newsList
            ? ""
            : newsList.map((news, index) =>
                index == 0 ? null : (
                  <div className="col-sm-6 col-md-3 p-rl-1 p-b-2" key={index}>
                    <div
                      className="bg-img1 size-a-14 how1 pos-relative"
                      style={{
                        backgroundImage: `url(${news.img_quote.replace(
                          "uploads\\newsimages\\",
                          "http://localhost:5000/newsimages/"
                        )})`,
                      }}
                    >
                      <a href="#" className="dis-block how1-child1 trans-03" />
                      <div className="flex-col-e-s s-full p-rl-25 p-tb-20">
                        <h3 className="how1-child2 m-t-14">
                          <Link
                            to={`/blogdetail/${news.id}`}
                            className="how-txt1 size-a-6 f1-l-1 cl0 hov-cl10 trans-03"
                          >
                            {news.title_news}
                          </Link>
                        </h3>
                      </div>
                    </div>
                  </div>
                )
              )}
        </div>
      </div>
    </section>
  );
}

export default Category_PostImages;
