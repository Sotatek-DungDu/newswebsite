import React, { useEffect, useState } from "react";
import iconNight from '../../../assets/images/icons/icon-night.png'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Topbar({ userdata, weather }) {

    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.clear();
        navigate('/login');
    }
    console.log("weather", weather);

    return (
        <div className="topbar" >
            <div className="content-topbar container h-100">
                <div className="left-topbar">
                    <span className="left-topbar-item flex-wr-s-c">
                        <span>
                            {weather?.data?.location?.name} - {weather?.data?.location?.country}
                        </span>
                        <img className="m-b-1 m-rl-8" src={weather?.data?.current?.condition?.icon} alt="IMG" />
                        <span style={{ display: 'flex', marginTop: '1rem' }}>
                            {weather?.data?.current?.temp_c} {<p>&#186;C</p>}
                        </span>
                    </span>
                    <Link to="/contact" className="left-topbar-item">
                        Liên hệ
                    </Link>
                    {!userdata?.profileImg && <><a href="http://localhost:3000/register" className="left-topbar-item">
                        Đăng ký
                    </a>
                        <a href="http://localhost:3000/login" className="left-topbar-item">
                            Đăng nhập
                        </a></>}
                </div>

                {userdata?.profileImg && <div className="right-topbar" style={{ display: 'inline-flex', marginRight: '55px' }}>
                    <a href="#" className="avatar">
                        <img src={userdata?.profileImg?.replace('uploads', 'http://localhost:5000')} alt="IMG" style={{ width: '40px', borderRadius: '50%', marginTop: '1rem', marginRight: '0.4rem' }} />
                    </a>
                    <a href="#" className="name" style={{ textDecoration: 'none', fontWeight: 600, marginTop: '1.2rem' }}>
                        {userdata?.username}
                    </a>
                    <a href="#">
                        <div class="dropdown">
                            <button class="dropbtn"><p><i class="arrow down"></i></p></button>
                            <div class="dropdown-content">
                                <div>
                                    <a to='/' style={{ display: 'flex' }}>
                                        <a href="#">
                                            <img src={userdata?.profileImg?.replace('uploads', 'http://localhost:5000')} alt="IMG" style={{ width: '53px', borderRadius: '50%', marginTop: '0rem', marginRight: '0rem' }} />
                                        </a>
                                        <a href="#" style={{ textDecoration: 'none', fontWeight: 600, marginTop: '1rem', color: "black" }}>
                                            {userdata?.username}
                                        </a>
                                    </a>
                                </div>
                                <a href="#" style={{ color: 'black', fontWeight: 600 }}>
                                    {userdata?.mail}
                                </a>

                                <a href="#" style={{ color: 'black', fontWeight: 600 }} >
                                    {userdata?.phone}
                                </a>
                                <button className="btn w-100 text-start ps-0 px-3 ml-3" onClick={handleClick} style={{ fontWeight: '600' }}>Logout</button>
                            </div>
                        </div>
                    </a>
                </div>}
            </div>
        </div>
    )
}

export default Topbar