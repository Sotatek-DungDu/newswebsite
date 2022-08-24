import React from "react";
import moment from 'moment';

function BlogGridContent({ item }) {
  return (
    <div className="col-md-10 col-lg-6 p-b-50">
      <div className="row">
        <div className="col-sm-16 p-r-25 p-r-15-sr991">
          <div className="m-b-45">
            <a href="blog-detail-01.html" className="wrap-pic-w hov1 trans-03">
              <img src={(item.img_quote).replace('uploads', 'http://localhost:5000')} alt="IMG" />
            </a>

            <div className="p-t-16">
              <h5 className="p-b-5">
                <a href="blog-detail-01.html" className="f1-m-3 cl2 hov-cl10 trans-03" style={{ textDecoration: 'none' }}>
                  {item.title_quote}
                </a>
              </h5>

              <span className="cl8">
                <a href="/" className="f1-s-4 cl8 hov-cl10 trans-03">
                  by {item.title_news}
                </a>

                <span className="f1-s-3 m-rl-3">
                  -
                </span>

                <span className="f1-s-3">
                  {moment(item.date_posted).add(0, 'year').format('LL')}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogGridContent