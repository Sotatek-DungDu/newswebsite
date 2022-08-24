import React, { memo } from "react";
import { Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteFeedback from "./DeleteFeedback";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import exportDefault from "../../../redux/action";
import { useDispatch } from "react-redux";
import Done from "./Done";

function FeedbackList({ data, index }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = async () => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:5000/feedback/admin/${data.id}`,
      {
        isread: false,
        isdone: true
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(
      exportDefault.editFeedback({
        id: data.id,
        isread: false,
        isdone: true
      })
    );
    navigate(`/admin/feedbacks/${data.id}`)
  }
  return (
    <>
      <tr key={data.id} className={data.isread === false ? "hover-item hover__card" : "hover-item text__bold hover__card"}>
          <td>{index}</td>
          <td onClick={handleClick}>{data.name}</td>
          {/* <td onClick={handleClick}>{data.title_feedback}</td>
          <td onClick={handleClick}>{data.content_feedback}</td> */}
          <td onClick={handleClick} className="">
          <p className="text__hidden">{data.title_feedback}</p>
    </td>
          <td onClick={handleClick} style={{ width: "100%" }} className=""><p className="text__hidden pt-0" style={{width: "800px"}}>{data.content_feedback}</p></td>
          <td className="item-action">
            <Dropdown>
              <Dropdown.Toggle
                className="dropdown-comment"
                variant="success"
                id="dropdown-basic"
              >
                <BsThreeDotsVertical />
              </Dropdown.Toggle>

              <Dropdown.Menu className="p-0 border-0" style={{ maxWidth: "80px" }}>
                <DeleteFeedback id={data.id} />
                {data.isdone === true && (<Done id={data.id}/>)}
              </Dropdown.Menu>
            </Dropdown>
          </td>
      </tr>
    </>
  );
}

export default memo(FeedbackList);
