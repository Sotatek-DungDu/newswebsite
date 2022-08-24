import React from "react";
import iconNight from '../../../assets/images/icons/icon-night.png'

function MenuMobile() {
    return (
        <div className="menu-mobile">
            <ul className="topbar-mobile">
                <li className="left-topbar">
                    <span className="left-topbar-item flex-wr-s-c">
                        <span>
                            New York, NY
                        </span>
                        <img className="m-b-1 m-rl-8" src={iconNight} alt="IMG" />
                        <span>
                            HI 58° LO 56°
                        </span>
                    </span>
                </li>
                <li className="left-topbar">
                    <a href="#" className="left-topbar-item">
                        About
                    </a>
                    <a href="#" className="left-topbar-item">
                        Hòm thư liên hệ
                    </a>
                    <a href="#" className="left-topbar-item">
                        Sing up
                    </a>
                    <a href="#" className="left-topbar-item">
                        Log in
                    </a>
                </li>
            </ul>
            <ul className="main-menu-m">
                <li>
                    <a href="#">Home</a>
                    <ul className="sub-menu-m">
                        <li><a href="#">Homepage v1</a></li>
                        <li><a href="#">Homepage v2</a></li>
                        <li><a href="#">Homepage v3</a></li>
                    </ul>
                    <span className="arrow-main-menu-m">
                        <i className="fa fa-angle-right" aria-hidden="true" />
                    </span>
                </li>
                <li>
                    <a href="#">News</a>
                </li>
                <li>
                    <a href="#">Entertainment </a>
                </li>
                <li>
                    <a href="#">Business</a>
                </li>
                <li>
                    <a href="#">Travel</a>
                </li>
                <li>
                    <a href="#">Life Style</a>
                </li>
                <li>
                    <a href="#">Video</a>
                </li>
                <li>
                    <a href="#">Features</a>
                    <ul className="sub-menu-m">
                        <li><a href="#">Category Page v1</a></li>
                        <li><a href="#">Category Page v2</a></li>
                        <li><a href="#">Blog Grid Sidebar</a></li>
                        <li><a href="#">Blog List Sidebar v1</a></li>
                        <li><a href="#">Blog List Sidebar v2</a></li>
                        <li><a href="#">Blog Detail Sidebar</a></li>
                        <li><a href="#">Blog Detail No Sidebar</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Hòm thư liên hệ</a></li>
                    </ul>
                    <span className="arrow-main-menu-m">
                        <i className="fa fa-angle-right" aria-hidden="true" />
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default MenuMobile