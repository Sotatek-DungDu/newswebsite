import React, { memo } from "react";
import { Nav } from "react-bootstrap";
import "../../../assets/css/sidebar.css";
import Logo from "../../../assets/images/logo.ef7bfcda.png";
import { FaHome, FaNewspaper, FaUserAlt, FaCommentAlt } from "react-icons/fa";
import { RiAdvertisementFill } from "react-icons/ri";
import { FcFeedback } from "react-icons/fc";
import { AiFillNotification} from "react-icons/ai"

function Sidebar({ activeKey }) {
  return (
    <div className="offcanvas offcanvas-start" style={{maxWidth: "270px"}} id="demo">
      <div className="offcanvas-body">
      <Nav
        variant="pills"
        activeKey={activeKey}
        className="d-block text-left bg-light sidebar position-fixed px-3 py-5 shadow top-0"
      >
        <Nav.Item className="mb-5 text-center">
          <img src={Logo} alt="Logo" width={150} height={80} />
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/admin"
            className="px-4 py-2 mb-3 d-flex align-items-center nav__link"
          >
            <FaHome className="me-2" />
            Bảng điều khiển
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/admin/posts"
            className="px-4 py-2 mb-4 d-flex align-items-center nav__link"
          >
            <FaNewspaper className="me-2" />
            Tin tức
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/admin/comments"
            className="px-4 py-2 mb-4 d-flex align-items-center nav__link"
          >
            <FaCommentAlt className="me-2" />
            Bình luận
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/admin/feedbacks"
            className="px-4 py-2 mb-4 d-flex align-items-center nav__link"
          >
            <FcFeedback className="me-2" />
            Phản hồi
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/admin/users"
            className="px-4 py-2 mb-4 d-flex align-items-center nav__link"
          >
            <FaUserAlt className="me-2" />
            Người dùng
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/admin/advertisement"
            className="px-4 py-2 mb-4 d-flex align-items-center nav__link"
          >
            <RiAdvertisementFill className="me-2" />
            Quảng cáo
          </Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link
            href="/admin/statistics"
            className="px-4 py-2 mb-4 d-flex align-items-center nav__link"
          >
            <FcStatistics className="me-2" />
            Statistics
          </Nav.Link>
        </Nav.Item> */}
        <Nav.Item>
          <Nav.Link
            href="/admin/notifications"
            className="px-4 py-2 mb-4 d-flex align-items-center nav__link"
          >
            <AiFillNotification className="me-2" />
            Thông báo
          </Nav.Link>
        </Nav.Item>
      </Nav>
      </div>
    </div>
  );
}

export default memo(Sidebar);
