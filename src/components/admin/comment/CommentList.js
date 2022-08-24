import React, { memo, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import CommentDelete from "./CommentDelete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CommentList({ data, index }) {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [news, setNews] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const access_token = localStorage.getItem("token");
        if (data.id_user) {
          const resp = await axios.get(
            `http://localhost:5000/auth/${data.id_user}`,
            {
              headers: { Authorization: `Bearer ${access_token}` },
            }
          );
          setName(resp.data.username);
        }
        if (data.id_news) {
          const res = await axios.get(
            `http://localhost:5000/news/${data.id_news}`,
            {
              headers: { Authorization: `Bearer ${access_token}` },
            }
          );
          setNews(res.data.title_news);
        }
        // console.log(resp.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [data]);
  const handleClick = async () => {
    navigate(`/admin/comments/${data.id}`);
  };
  
  return (
    <>
      {data && (
        <tr key={data.id} className="hover-item hover__card">
          <td>{index}</td>
          <td onClick={handleClick}>{name}</td>
          <td onClick={handleClick} className="">
          <p className="text__hidden">{news}</p>
    </td>
          <td onClick={handleClick} style={{ width: "40%" }} className=""><p className="text__hidden pt-0" style={{width: "400px"}}>{data.content}</p></td>
          <td onClick={handleClick}>{data.date_posted}</td>
          <td className="item-action">
            <Dropdown>
              <Dropdown.Toggle
                className="dropdown-comment"
                variant="success"
                id="dropdown-basic"
              >
                <BsThreeDotsVertical />
              </Dropdown.Toggle>
              <Dropdown.Menu className="border-0 p-0" style={{ maxWidth: "80px" }}>
                <CommentDelete id={data.id} />
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      )}
    </>
  );
}

export default memo(CommentList);
