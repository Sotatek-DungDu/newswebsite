import React from "react";
import logo1 from "../../../assets/images/icons/logo-01.png";
import post5 from "../../../assets/images/post-05.jpg";
import post10 from "../../../assets/images/post-10.jpg";
import post6 from "../../../assets/images/post-06.jpg";
import post8 from "../../../assets/images/post-08.jpg";
import post34 from "../../../assets/images/post-34.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";

function MainNav() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState([]);
  const [categories, setCategories] = useState([]);
  const [classify, setClassify] = useState([]);

  useEffect(async () => {
    const response = await fetch(`http://localhost:5000/category`);
    const data = await response.json();
    let catess = [];
    for (const item of data) {
      const calsss = await fetch(
        `http://localhost:5000/classify/category/${item.id}`
      );
      const dataCalsss = await calsss.json();
      for (let classify of dataCalsss) {
        const cccc = await fetch(
          `http://localhost:5000/news/classify/${classify.id}`
        );
        const ccdata = await cccc.json();
        classify.news = ccdata;
      }

      catess.push({
        id: item.id,
        name: item.name_category,
        classify: dataCalsss,
      });
    }
    setCategories(catess);
    console.log("catess", catess);
  }, []);
  const posts = items.slice(0, 4);

  return (
    <div className="wrap-main-nav">
      <div className="main-nav">
        {/* Menu desktop */}
        <nav className="menu-desktop">
          <a className="logo-stick">
            <img src={logo1} alt="LOGO" />
          </a>
          <ul
            className="main-menu"
            style={{ justifyContent: "center!important" }}
          >
            <li className="main-menu-active">
              <Link to="/">Trang Chủ</Link>
            </li>

            {categories?.map((category, index) => (
              <li className="mega-menu-item">
                <Link to="#">{category.name}</Link>
                <div className="sub-mega-menu">
                  <div className="nav flex-column nav-pills" role="tablist">
                    {category.classify?.map((clas) => (
                      <Link
                        className="nav-link"
                        to="#"
                        id={`${category.id}-${clas.id}`}
                        onMouseOver={(e) => {
                          const ids = e.target.id.split("-");
                          const idCate = ids[0];
                          const idClass = ids[1];

                          const css =
                            document.getElementsByClassName("news-of");
                          for (const ss of css) {
                            ss.classList.add("hide");
                          }
                          const nn = document.getElementById(
                            `news-of-${idClass}`
                          );
                          if (nn) {
                            nn.classList.remove("hide");
                          }
                        }}
                      >
                        {clas.name_classify}
                      </Link>
                    ))}
                  </div>

                  <div className="tab-content">
                    {category?.classify?.map((ccc) => (
                      <div class="row hide news-of" id={`news-of-${ccc.id}`}>
                        {ccc?.news?.map((cl) => (
                          <div className="col-3" style={{ padding: "30px" }}>
                            <div>
                              <a
                                href={`/blogdetail/${cl.id}`}
                                className="wrap-pic-w hov1 trans-03"
                              >
                                <img style={{ width: '750px', height: '440px' }}
                                  src={cl.img_quote.replace(
                                    "uploads\\newsimages\\",
                                    "http://localhost:5000/newsimages/"
                                  )}
                                  alt="IMG"
                                />
                              </a>

                              <div className="p-t-10">
                                <h5 className="p-b-5">
                                  <a
                                    href={`/blogdetail/${cl.id}`}
                                    className="f1-s-5 cl3 hov-cl10 trans-03"
                                  >
                                    {cl.title_news}
                                  </a>
                                </h5>

                                <span className="cl8">
                                  <a
                                    href="#"
                                    className="f1-s-6 cl8 hov-cl10 trans-03"
                                  >
                                    {cl.title_quote}
                                  </a>
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default MainNav;
