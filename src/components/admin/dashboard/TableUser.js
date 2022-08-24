import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TableUser() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const access_token = localStorage.getItem("token");
        const resp = await axios.get(`http://localhost:5000/auth/admin`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        setUsers(resp.data.sort((a, b) => (a.id < b.id ? 1 : -1)));
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const handleClick = () => {
    navigate('/admin/users')
  } 
  return (
    <div className="table__scroll" style={{overflowX: "auto"}}>
      <Table responsive="md" hover striped className="w-100">
        <thead>
          <tr>
            <th>#</th>
            <th style={{minWidth: "140px"}}>Tên người dùng</th>
            <th>Email</th>
            <th style={{minWidth: "130px"}}>Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => {
              const { username, mail, phone } = user;
              return (
                <tr onClick={handleClick} key={index} style={{cursor: "pointer"}} className="hover__card">
                  <td>{index + 1}</td>
                  <td>{username}</td>
                  <td>{mail}</td>
                  <td>{phone}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default TableUser;
