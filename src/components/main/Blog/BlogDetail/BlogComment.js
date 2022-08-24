import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function BlogComment({ userdata }) {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate('/login');
  }
  const getComment = () => {
    var container = document.getElementById("blogcomment");
    var section = document.getElementById("comment");
    container.appendChild(section.cloneNode(true));
    localStorage.setItem('comment', JSON.stringify({ conntent_comment: show_comment }));
    var conntent_comment = document.getElementById('conntent_comment').value
    var show_comment = document.getElementById('show_comment').innerHTML = conntent_comment
  }

  return (
    <>
      {userdata?.profileImg && <div>
        <h1>Bình luận</h1>
        <div id="blogcomment" style={{ borderBottom: 'solid 0.5px gray', borderWidth: '0.5px', marginBottom: '30px' }}>
          <section id="comment">
            <span> <img src={userdata?.profileImg?.replace('uploads', 'http://localhost:5000')} style={{ width: '54px', borderRadius: '50%', marginTop: '1rem', marginRight: '0.4rem', borderStyle: 'solid' }} /></span>
            <span style={{ fontSize: '22px', fontWeight: '600', marginTop: '10px' }}>{userdata?.username}</span>
            <p id="show_comment" style={{ marginLeft: '80px', fontSize: '18px' }}>xời , tuyệt vời</p>
          </section>
        </div>

        <h4 className="f1-l-4 cl3 p-b-12">
          Bình Luận
        </h4>
        <form>
          <label>Tên</label>
          <input value={userdata?.username} className="bo-1-rad-3 bocl13 size-a-16 f1-s-13 cl5 plh6 p-rl-18 m-b-20" name="name" placeholder="Name*" />
          <label>Email</label>
          <input value={userdata?.mail} className="bo-1-rad-3 bocl13 size-a-16 f1-s-13 cl5 plh6 p-rl-18 m-b-20" name="email" placeholder="Email*" />

          <textarea id="conntent_comment" className="bo-1-rad-3 bocl13 size-a-15 f1-s-13 cl5 plh6 p-rl-18 p-tb-14 m-b-20" name="msg" placeholder="Comment..."></textarea>
          <button type='button' onClick={getComment} style={{ backgroundColor: 'green', padding: '15px', fontSize: '16px', fontWeight: '600', color: 'white', border: '30px' }}>
            Đăng Bình luận
          </button>
        </form>
      </div>}
    </>

  )
}

export default BlogComment