import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import image1 from "../../../assets/images/entertaiment-06.jpg";
import image2 from "../../../assets/images/entertaiment-17.jpg";
import axios from "axios";

function Category_ItemPost() {
  const params = useParams();
  const [newsList, setNewsList] = useState();

  useEffect(async () => {
    await axios.get(`http://localhost:5000/news/category/${params.id}`).then(
      (result) => {
        setNewsList(result.data);
        console.log("news List:", result);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="col-md-10 col-lg-8 p-b-80">
      <div className="row">
        <div className="col-sm-6 p-r-25 p-r-15-sr991">

          <div className="p-b-53">
            
            <a href="#" className="wrap-pic-w hov1 trans-03">
              <img src={image1} alt="IMG" />
            </a>

            <div className="flex-col-s-c p-t-16">
              <h5 className="p-b-5 txt-center">
                <a href="#" className="f1-m-3 cl2 hov-cl10 trans-03">
                  You wish lorem ipsum dolor sit amet consectetur
                </a>
              </h5>
              <div className="cl8 txt-center p-b-17">
                <a href="#" className="f1-s-4 cl8 hov-cl10 trans-03">
                  Celebrity
                </a>
                <span className="f1-s-3 m-rl-3">-</span>
                <span className="f1-s-3">Feb 18</span>
              </div>
              <p className="f1-s-11 cl6 txt-center p-b-16">
                Curabitur volutpat bibendum molestie. Vestibulum ornare gravida
                semper. Aliquam a dui suscipit, fringilla metus id, maximus leo.
              </p>
              <a href="#" className="f1-s-1 cl9 hov-cl10 trans-03">
                Read More
                <i className="m-l-2 fa fa-long-arrow-alt-right" />
              </a>
            </div>
          </div>

        </div>

      </div>
   
    </div>
  );
}

export default Category_ItemPost;
