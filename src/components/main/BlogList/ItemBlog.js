import React from "react";
import { useState, useEffect, useContext } from 'react'
import { Link, useParams } from "react-router-dom"

function ItemBlog() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [urlImage, setUrlImage] = useState(null);
  const parmas = useParams()

  useEffect(() => {
    fetch("http://localhost:5000/news")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  const post = items.slice(0, 4)

  // useEffect(() => {
  //   try{
  //     const test = items.map(item => (
  //       setUrlImage( item.img_quote )
  //     ))
  //     // console.log(urlImage)
  //   }
  //   catch(error){
  //     console.log(error)
  //   }
  // },[])

  return (
    <div className="col-md-10 col-lg-8 p-b-80">
      <div className="p-r-10 p-r-0-sr991">
        <div className="m-t--65 p-b-40">
          {/* Item Blog */}
          {post.map((item, index) => (
            <div className="flex-col-s-c how-bor2 p-t-65 p-b-40" key={index}>
              <Link to="/category" className="f1-s-10 cl2 text-uppercase txt-center hov-cl10 trans-03 p-b-40">
                {item.category}
              </Link>
              <h5 className="p-b-17 txt-center">
                <Link to={`/blogdetailcontent/${item.id}`} className="f1-l-1 cl2 hov-cl10 trans-03 respon2">
                  {item.title_news}
                </Link>
              </h5>
              <div className="cl8 txt-center p-b-24">
                <span className="f1-s-3 m-rl-3">
                  -
                </span>
                <span className="f1-s-3">
                  {item.date_posted}
                </span>
              </div>
              <Link to={`/blogdetailcontent/${item.id}`} className="wrap-pic-w hov1 trans-03 m-b-30">
                <img style={{ width: '750px' }} src={(item.img_quote).replace('uploads', 'http://localhost:5000/')} alt="IMG" />
              </Link>
              <p className="f1-s-11 cl6 txt-center p-b-22">
                {item.content_news}
              </p>
              <Link to={`/blogdetailcontent/${item.id}`} className="f1-s-1 cl9 hov-cl10 trans-03">
                Read More
                <i className="m-l-2 fa fa-long-arrow-alt-right" />
              </Link>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex-wr-c-c m-rl--7 p-t-15">
          <a href="#" className="flex-c-c pagi-item hov-btn1 trans-03 m-all-7 pagi-active">1</a>
          <a href="#" className="flex-c-c pagi-item hov-btn1 trans-03 m-all-7">2</a>
        </div>
      </div>
    </div>
  )
}

export default ItemBlog