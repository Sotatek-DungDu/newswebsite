import React from "react";
function HeaderMobile() {
    return (
        <div className="wrap-header-mobile">
            {/* Logo moblie */}
            <div className="logo-mobile">
                <a href="#"><img src="/static/media/tuoitre.105a5fcd707259c7f2be.png" alt="LOGO" /></a>
            </div>
            {/* Button show menu */}
            <div className="btn-show-menu-mobile hamburger hamburger--squeeze m-r--8">
                <span className="hamburger-box">
                    <span className="hamburger-inner" />
                </span>
            </div>
        </div>
    )
}

export default HeaderMobile