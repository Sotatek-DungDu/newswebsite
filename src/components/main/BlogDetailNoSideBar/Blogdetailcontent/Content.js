import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const Content = () => {
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
        <div className="container p-t-82">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 p-b-100">
              <div className="p-r-10 p-r-0-sr991">
                {/* Blog Detail */}
                <div className="p-b-70">
                  <p className="f1-s-11 cl6 p-b-25" style={{ fontSize: '23px' }}>
                    {news.content_news}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>

  );
}

export default Content;