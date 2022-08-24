import React, { memo, useLayoutEffect, useState } from 'react'
import '../../../assets/css/listposts.css';
import useFetchData from "../../../hooks/useFetchData";
import { useDispatch, useSelector } from "react-redux";
import exportDefault from "../../../redux/action";
import { REQUEST_STATE } from '../../../configs';
import { useEffect } from 'react';
import { GET } from '../../../api/fetch';
import { Table } from 'antd';
import Moment from 'react-moment';
import 'antd/dist/antd.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getImageFromAPI } from 'helper/media';

export default function DetailPosts(props) {
    const [news, setNews] = useState({});
    let { id } = useParams();
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATE.REQUEST);


    useEffect(() => {
        (async () => {
            let detailNews = await GET(`/news/${id}`);
            // console.log('detailPost: ', detailNews);
            // setNews(detailNews);

            let newListPost = []
            let detailCategory = await GET("/category/" + detailNews.id_category)
            let detailClassify = await GET("/classify/" + detailNews.id_classify)
            newListPost.push({
                ...detailNews,
                category_name: detailCategory.name_category,
                classify_name: detailClassify.name_classify,
            })
            console.log(newListPost)
            setNews(newListPost[0]);
            setRequestStatus(REQUEST_STATE.SUCCESS);
        })();

    }, [id])

    if (requestStatus === REQUEST_STATE.REQUEST) {
        return <div>LOADING...</div>
    } else {
        return (
            <div className="mt-5 mb-2 main__content">
                {/* Sửa CSS ở đây */}
                <div className='container-fluid' style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "10px 10px 10px 10px",
                }}>
                    <img style={{
                        maxWidth: "450px",
                        marginBottom: "60px"
                    }} src={getImageFromAPI(news.img_quote)} alt="" />
                    <div className='pb-2'><b>Tiêu Đề</b></div>
                    <div>{news?.title_news}</div>
                    <div className='pt-3 pb-2'><b>Ngày đăng</b></div>
                    <Moment format="DD/MM/YYYY">
                        <div>{news?.date_posted.toString()}</div>
                    </Moment>
                    <div className='pt-3 pb-2'><b>Nội Dung</b></div>
                    <div dangerouslySetInnerHTML={{ __html: news.content_news }} />
                    <div className='pt-3 pb-2'><b>Danh Mục</b></div>
                    <div dangerouslySetInnerHTML={{ __html: news.category_name }} />
                    <div className='pt-3 pb-2'><b>Thể loại</b></div>
                    <div dangerouslySetInnerHTML={{ __html: news.classify_name }} />

                </div>

            </div>
        )
    }


}
