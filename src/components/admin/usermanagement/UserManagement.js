import React, { useEffect, useState } from "react";
import TableContent from "./TableContent";
import { Container } from "react-bootstrap";
import AddUser from "./AddUser";
import axios from "axios";
import paginate from "context/utils";
import exportDefault from '../../../redux/action';
import {useDispatch, useSelector} from 'react-redux'

function UserManagement() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch()
  const listUser = useSelector(state => state.users)

  useEffect(() => {
    const getUser = async () => {
      try {
        const access_token = localStorage.getItem("token");
        const resp = await axios.get(`http://localhost:5000/auth/admin`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        dispatch(exportDefault.setUser(resp.data.sort((a, b) => (a.id < b.id ? 1 : -1))))
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [listUser.loading, dispatch]);

  useEffect(() => {
    if(listUser.listUser) {
      setUsers(paginate(listUser.listUser));
    }
  },[listUser.listUser])
  return (
    <div className="my-sm-5 main__content">
      <Container className="px-sm-2 position-relative">
        <h3 className="d-block px-sm-4 mb-4">Tất cả người dùng</h3>
        <AddUser />
        {/* <button className='btn btn-primary position-absolute top-0' style={{right: "20px"}}>Add User</button> */}
        <TableContent className="mt-2" data={users} />
      </Container>
    </div>
  );
}

export default UserManagement;
