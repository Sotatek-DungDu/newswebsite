import React from 'react'
import logo from '../../assets/images/icons/tuoitre.png'
import post from '../../assets/images/post-01.jpg'
function Footer() {
  return (
    <React.Fragment>
      <div className="bg2 p-t-40 p-b-25">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 p-b-20">
              <div className="size-h-3 flex-s-c">
                <a href="#">
                  <img className="max-s-full" src={logo} alt="LOGO" width={200} />
                </a>
              </div>
              <div>
                <p className="f1-s-1 cl11 p-b-16" style={{}}>
                  Thông tin liên hệ xin vui lòng gửi tới số 96 716 6879
                </p>
                <div className="p-t-15">
                  <a href="#" className="fs-18 cl11 hov-cl10 trans-03 m-r-8">
                    <span className="fab fa-facebook-f" />
                  </a>
                  <a href="#" className="fs-18 cl11 hov-cl10 trans-03 m-r-8">
                    <span className="fab fa-twitter" />
                  </a>
                  <a href="#" className="fs-18 cl11 hov-cl10 trans-03 m-r-8">
                    <span className="fab fa-pinterest-p" />
                  </a>
                  <a href="#" className="fs-18 cl11 hov-cl10 trans-03 m-r-8">
                    <span className="fab fa-vimeo-v" />
                  </a>
                  <a href="#" className="fs-18 cl11 hov-cl10 trans-03 m-r-8">
                    <span className="fab fa-youtube" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Footer