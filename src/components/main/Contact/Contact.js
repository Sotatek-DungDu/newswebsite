import React from 'react'
import Sidebar from './Sidebar'
import Header from "../Header/Header";
import Footer from "../Footer";
import Address from '../Address';

function Contact() {
  return (
    <React.Fragment>
      <Header />
      <Address />
      <div className="container p-t-4 p-b-40">
        <h2 className="f1-l-1 cl2">
          Hòm thư liên hệ
        </h2>
      </div>
      <section className="bg0 p-b-60">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-8 p-b-80">
              <div className="p-r-10 p-r-0-sr991">
                <form>
                  <input className="bo-1-rad-3 bocl13 size-a-19 f1-s-13 cl5 plh6 p-rl-18 m-b-20" type="text" name="name" placeholder="Tên*" />
                  <input className="bo-1-rad-3 bocl13 size-a-19 f1-s-13 cl5 plh6 p-rl-18 m-b-20" type="text" name="email" placeholder="Email*" />
                  <textarea className="bo-1-rad-3 bocl13 size-a-15 f1-s-13 cl5 plh6 p-rl-18 p-tb-14 m-b-20" name="msg" placeholder="Để lại bình luận" defaultValue={""} />
                  <button className="size-a-20 bg2 borad-3 f1-s-12 cl0 hov-btn1 trans-03 p-rl-15 m-t-20">
                    Gửi
                  </button>
                </form>
              </div>
            </div>
            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  )
}

export default Contact