import React, { memo, useState, useEffect } from "react";
import { Table, Dropdown } from "react-bootstrap";
import NoAvatar from "../../../assets/images/no-avatar.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import ResetPassword from "./ResetPassword";
import "../../../assets/scss/dropdown.scss";

function TableContent({data}) {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(data[page]);
    // setCount(data.length);
  }, [page, data]);
  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = data.length - 1;
      }
      return prevPage;
    });
  };
  const handlePage = (index) => {
    setPage(index);
  };

  return (
    <>
      <Table responsive="sm">
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: "7%" }}>Hình ảnh</th>
          <th>Tên người dùng</th>
          <th>Số điện thoại</th>
          <th style={{ width: "20%" }}>Địa chỉ email</th>
          <th>Ngày tạo</th>
          <th>Vai trò</th>
          <th style={{ width: "40px" }}></th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.sort((a, b) => (a.id < b.id ? 1 : -1)).map((item, key) => {
            const { id, profileImg, username, phone, mail, created, role } =
              item;
            let urlImage = null;
            if (profileImg !== null && profileImg !== undefined) {
              const arrImage = profileImg.split("\\");
              urlImage = `http://localhost:5000/userimages/${arrImage[2]}`;
            }
            //const urlImage = `http://localhost:5000/userimages/${profileImg}`
            return (
              <tr key={key} className="hover-item hover__card">
                <td>{key + 1}</td>
                <td>
                  <img
                    className="mw-100 rounded-circle shadow"
                    height={40}
                    width={40}
                    src={profileImg !== null ? urlImage : NoAvatar}
                    alt="avatar user"
                  />
                </td>
                <td>{username}</td>
                <td>{phone}</td>
                <td>{mail}</td>
                <td>{created}</td>
                <td>{role}</td>
                <td className="item-action">
                  <Dropdown>
                    <Dropdown.Toggle
                      className="dropdown-comment"
                      variant="success"
                      id="dropdown-basic"
                    >
                      <BsThreeDotsVertical />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown__menu border-0 p-0">
                      <EditUser id={id} data={users}/>
                      <ResetPassword id={id}/>
                      <DeleteUser id={id} />
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
    {users && (
        <div className="btn-container">
          <button className="prev-btn" onClick={prevPage}>
            Trước
          </button>
          {data.map((item, index) => {
            return (
              <button
                key={index}
                className={`page-btn ${index === page ? "active-btn" : null}`}
                onClick={() => handlePage(index)}
              >
                {index + 1}
              </button>
            );
          })}
          <button className="next-btn" onClick={nextPage}>
            Sau
          </button>
        </div>
      )}
    </>
  );
}

export default memo(TableContent);
