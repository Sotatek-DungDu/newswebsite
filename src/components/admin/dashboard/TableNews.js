import React, { useState, useEffect, memo } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TableNews({data}) {
  const navigate = useNavigate();
  const [news, setNews] = useState();
  useEffect(() => {
    const getUser = async () => {
      try {
        const resp = await axios.get(`http://localhost:5000/news`);
        setNews(resp.data.sort((a, b) => (a.id < b.id ? 1 : -1)))
        // setListNews(resp.data.sort((a, b) => (a.id < b.id ? 1 : -1)));
        // const arrNews = [];
        // resp.data.map((item) => {
        //   const getData = async () => {
        //    try {
        //     const classify = await axios.get(
        //       `http://localhost:5000/classify/${item.id_classify}`
        //     );
        //     const category = await axios.get(
        //       `http://localhost:5000/category/${item.id_category}`
        //     );
        //     arrNews.push({
        //       ...item,
        //       id_classify: classify.data.name_classify,
        //       id_category: category.data.name_category,
        //     });
        //    } catch (error) {
        //      console.log(error)
        //    }
        //   };
        //   getData();
        // });
        // setNews(arrNews.sort((a, b) => (a.id < b.id ? 1 : -1)));
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  
  const handleClick = (id) => {
    navigate(`/admin/posts/${id}`);
  };

  return (
    <>
      <Table className="w-100">
        <thead>
          <tr>
            <th>#</th>
            <th>Tiêu đề</th>
            <th>Trích dẫn</th>
            <th>Nội dung</th>
          </tr>
        </thead>
        <tbody>
          {news !== undefined &&
            news.map((news, index) => {
              const {
                id,
                title_news,
                title_quote,
                content_news,
              } = news;
              return (
                <tr onClick={() => handleClick(id)} key={index} style={{cursor: "pointer"}} className="hover__card">
                  <td>{index + 1}</td>
                  <td><p className="text__hidden" >{title_news}</p></td>
                  <td><p className="text__hidden" >{title_quote}</p></td>
                  <td><p className="text__hidden" >{content_news}</p></td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}

export default memo(TableNews);
