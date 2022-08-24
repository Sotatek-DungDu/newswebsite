import logo from '../../../assets/images/icons/tuoitre.png'

function Logo({ banner }) {

    return (
        <div className="wrap-logo container">
            {/* Logo desktop */}
            <div className="logo">
                <a href="#"><img src={logo} alt="LOGO" /></a>
            </div>
            {/* Banner */}
            <div className="banner-header">
                <a href="https://themewagon.com/themes/free-bootstrap-4-html5-news-website-template-magnews2/" style={{ width: '100%', height: '100%' }}><img src={banner?.img_advertise?.replace('uploads', 'http://localhost:5000')} alt="IMG" /></a>
            </div>
        </div>
    )
}

export default Logo