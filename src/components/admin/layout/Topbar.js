import React, { useState, memo, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Dropdown,
  Badge,
  NavItem,
  NavLink,
} from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import "../../../assets/css/topbar.css";
import NoAvatar from "../../../assets/images/no-avatar.png";
import axios from "axios";
import ResetPassword from "../usermanagement/ResetPassword";
import Logout from "../../user/Logout";
import Search from "../../admin/dashboard/Search";
import { useSelector, useDispatch } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import exportDefault from "redux/action";

function Topbar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [username, setUsername] = useState();
  const [urlImage, setUrlImage] = useState();
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const access_token = localStorage.getItem("token");
  const users = useSelector((state) => state.users);
  const listNotification = useSelector((state) => state.notifications)
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const idUser = localStorage.getItem("id_admin_current");
        const resp = await axios.get(`http://localhost:5000/auth/${idUser}`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        setUsername(resp.data.username);
        if (resp.data.profileImg !== null) {
          const arrImage = resp.data.profileImg.split("\\");
          const urlImg = `http://localhost:5000/userimages/${arrImage[2]}`;
          setUrlImage(urlImg);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/noti/admin`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        setNotifications(res.data.sort((a, b) => (a.id < b.id ? 1 : -1)));
        let i = 0;
        res.data.forEach((item, index) => {
          if (item.isread === false && index < 10) {
            i++;
          }
        });
        setCount(i);
      } catch (error) {
        console.log(error);
      }
    };
    getNotifications();
  }, [access_token, users.loading, listNotification.loading, listNotification.listNotification]);

  const handClick = (id) => {
    if (notifications) {
      notifications.forEach((item) => {
        if (item.id === id && item.isread === false) {
          (async () => {
            try {
              await axios.put(
                `http://localhost:5000/noti/admin/${id}`,
                { isread: true },
                {
                  headers: { Authorization: `Bearer ${access_token}` },
                }
              );
            } catch (error) {
              console.log(error);
            }
          })();
        }
      });
    }
  };
  const handleDelete = async (id) => {
    try {
      const access_token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/noti/admin/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      dispatch(exportDefault.deleteNotification(id))
      // window.location.reload();
    } catch (error) {
      console.log(id);
    }
  };

  return (
    <>
      <Navbar fixed="top" bg="light" expand="md" className="py-sm-3 topbar shadow">
        <Container fluid className="ms-lg-5">
          <div className="hidden ms-2 me-md-3 p-1 bg-primary rounded-2">
            <button
              className="px-2 py-1"
              onClick={handleShow}
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#demo"
            >
              <MdSpaceDashboard />
            </button>
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" className="" />
          <Navbar.Collapse
            id="navbarScroll"
            className="pt-4 pt-md-0 px-sm-0 px-3 ms-4 ms-md-0"
          >
            <Search />
            <Nav style={{ marginLeft: "auto" }}>
              <NavItem>
                <NavLink>
                  <img
                    src={urlImage ? urlImage : NoAvatar}
                    width={30}
                    height={30}
                    alt="avatar"
                    className="rounded-circle shadow-lg"
                  />
                </NavLink>
              </NavItem>
              <NavDropdown title={username} id="navbarScrollingDropdown">
                <NavDropdown.Item
                  href="/admin/profile"
                  className="btn w-100 text-start px-3 hover__card"
                >
                  Thiết lập cá nhân
                </NavDropdown.Item>
                <ResetPassword />
                {/* <NavDropdown.Item>
                </NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item className="hover__card">
                  <Logout />
                </NavDropdown.Item>
              </NavDropdown>
              <Dropdown className="me-3">
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="bg-light border-0 button__dropdown mb-0"
                >
                  <FaBell className="w-100 h-100 text-secondary" />
                  <Badge
                    bg="primary position-absolute"
                    className="rounded-circle"
                    style={{ left: "25px" }}
                  >
                    {count}
                  </Badge>
                </Dropdown.Toggle>
                {notifications && (
                  <Dropdown.Menu
                    className="navbar__menu"
                    style={{
                      left: "-270px",
                      width: "300px",
                      maxHeight: "400px",
                      overflowY: "scroll",
                    }}
                  >
                    {notifications &&
                      notifications.map((notification, index) => {
                        const { title, content, isread, id } = notification;
                        if (index < 10) {
                          return (
                            <div className="hover-item d-flex flex-row hover__card align-item-center" style={{ maxWidth: "300px", overflowX: "hidden" }}>
                              <Dropdown.Item
                                href="/admin/notifications"
                                onClick={() => handClick(id)}
                                className={
                                  isread === false
                                    ? "text__bold hover__card"
                                    : "hover__card"
                                }
                                style={{ maxWidth: "270px", overflowX: "hidden" }}
                                key={id}
                              >
                                <p
                                  style={{
                                    textTransform: "capitalize",
                                    wordBreak: "break-all",
                                    fontSize: "18px",
                                  }}
                                >
                                  {title}
                                </p>
                                <p className="wrap__text">{content}</p>
                              </Dropdown.Item>
                              <div className="item-action">
                                <Dropdown>
                                  <Dropdown.Toggle
                                    className="dropdown-comment"
                                    variant="success"
                                    id="dropdown-basic"
                                  >
                                    <BsThreeDotsVertical />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu className="dropdown__menu p-0 border-0">
                                    <button
                                      className="btn btn-danger w-100"
                                      onClick={() => handleDelete(id)}
                                    >
                                      Xóa thông báo
                                    </button>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </div>
                          );
                        }
                      })}
                  </Dropdown.Menu>
                )}
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default memo(Topbar);
