import React from "react";

function BlogShare() {
    return (
        <div className="p-b-70">
            <div className="flex-s-s">
                <span className="f1-s-12 cl5 p-t-1 m-r-15">
                  Share:
                </span>
                <div className="flex-wr-s-s size-w-0">
                  <a href="#" className="dis-block f1-s-13 cl0 bg-facebook borad-3 p-tb-4 p-rl-18 hov-btn1 m-r-3 m-b-3 trans-03">
                    <i className="fab fa-facebook-f m-r-7" />
                    Facebook
                  </a>
                  <a href="#" className="dis-block f1-s-13 cl0 bg-twitter borad-3 p-tb-4 p-rl-18 hov-btn1 m-r-3 m-b-3 trans-03">
                    <i className="fab fa-twitter m-r-7" />
                    Twitter
                  </a>
                  <a href="#" className="dis-block f1-s-13 cl0 bg-google borad-3 p-tb-4 p-rl-18 hov-btn1 m-r-3 m-b-3 trans-03">
                    <i className="fab fa-google-plus-g m-r-7" />
                    Google+
                  </a>
                  <a href="#" className="dis-block f1-s-13 cl0 bg-pinterest borad-3 p-tb-4 p-rl-18 hov-btn1 m-r-3 m-b-3 trans-03">
                    <i className="fab fa-pinterest-p m-r-7" />
                    Pinterest
                  </a>
                </div>
              </div>
        </div>
    )
}

export default BlogShare