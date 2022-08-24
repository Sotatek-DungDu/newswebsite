import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
function Title () {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [news, setNews] = useState();
  const params = useParams();

  useEffect(async () => {
    await axios
      .get(`http://localhost:5000/news/${params.id}`)
      .then(
        (result) => {
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
        <div className="bg-img1 size-a-18 how-overlay1" style={{
          backgroundImage: `url(${news.img_quote.replace(
            "uploads\\newsimages\\",
            "http://localhost:5000/newsimages/"
          )})`,
          marginTop: '-2rem', 
          width: '1595px', 
          backgroundPosition: 'center center', 
          left: '-48%'
        }}>
<div className="container h-full flex-col-e-c p-b-58">
<Link to="/category" className="f1-s-10 cl0 hov-cl10 trans-03 text-uppercase txt-center m-b-33">
{news.category}
</Link>
<Link to="/blogdetail" className="f1-l-5 cl0 p-b-16 txt-center respon2">
{news.title_news}
</Link>
<div className="flex-wr-c-s">
<span className="f1-s-3 cl8 m-rl-7 txt-center">
<span className="m-rl-3">-</span>
<span>
{news.date_posted}
</span>
</span>
<a href className="f1-s-3 cl8 m-rl-7 txt-center hov-cl10 trans-03">
0 Comment
</a>
</div>
</div>
        </div>
        )}
    </React.Fragment>
    
  );
};

export default Title;