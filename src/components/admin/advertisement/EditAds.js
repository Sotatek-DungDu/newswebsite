import React, { useEffect, useState } from "react";
import { GET, PUT, POST } from "../../../api/fetch";
import "../../../assets/css/addads.css";
import { REQUEST_STATE } from "../../../configs";
import { Form } from "antd";
import { Button, Col, Input, Row, Upload } from "antd";
import {
    PlusOutlined,
    DeleteOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import NoImage from "../../../assets/images/no-avatar.png";
import { Select } from "antd";
import axios from "axios";

const { Option } = Select;

function EditAds({ setIsEdit, idEdit }) {
    const [initialValues, setInitialValues] = useState({
        title_advertise: "",
        visible: "",
        img_advertise: "",
    });
    const [titles, setTitles] = useState([]);
    const [imgads, setImgads] = useState([]);
    const [urlImage, setUrlImage] = useState(null);
    const [file, setFile] = useState();

    // const [requestStatus, setRequestStatus] = useState(REQUEST_STATE.REQUEST);
    const [articleImages, setArticleImages] = useState([]);
    const [form] = Form.useForm();
    useEffect(() => {
        //console.log(form.setFieldsValue({title:}))
        const getImage = async () => {
            try {
                if (idEdit) {
                    const resp = await GET(`/adv/${idEdit}`);
                    if (resp.img_advertise !== null) {
                        const arrImage = resp.img_advertise.split("\\");
                        const urlImg = `http://localhost:5000/advimages/${arrImage[2]}`;
                        setUrlImage(urlImg);
                    }
                    // setInitialValues({
                    //     title_advertise: resp.title_advertise,
                    //     visible: resp.visible,
                    //     img_advertise: resp.img_advertise,
                    // });
                    form.setFieldsValue({
                        title: resp.title_advertise,
                        visible: resp.visible,
                    })
                }
                // console.log(resp.data);
            } catch (error) {
                console.log(error);
            }
        };
        getImage();
    }, [idEdit]);
    async function onFinish(params) {
        try {
            const token = localStorage.getItem("token");
            //   console.log(articleImages[0])
            if (idEdit) {
                await PUT(
                    `/adv/${idEdit}`,
                    { title_advertise: params.title, visible: params.visible },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                let formData = new FormData();
                formData.append("file", file);
                await POST(`/adv/admin/${idEdit}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                });

                setIsEdit(false);
            }
            await axios.post(
                "http://localhost:5000/noti/admin",
                {
                  title: "Edit Advertisement",
                  content: "Successfully edited advertisement",
                },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
            window.location.reload();
        } catch (err) {
            if (err.statusCode === 500) {
                setIsEdit(false);
                window.location.reload();
            }
            console.log(err);
        }
    }

    function onCategoryChange(value) {
        console.log(value);
    }

    function handleChangeUploadImage({ fileList }) {
        console.log("fileList: ", fileList);
        setArticleImages(fileList);
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
            setUrlImage(URL.createObjectURL(event.target.files[0]));
            // console.log(urlImage);
        }
    };
    // useEffect(() => {
    //     (async () => {
    //         let listClassifyNews = await GET("/classify_news");
    //         let listCategory = await GET("/category");
    //         // setClassifyNews(listClassifyNews);
    //         // setCategories(listCategory);
    //         // setRequestStatus(REQUEST_STATE.SUCCESS);
    //     })();
    // }, [])

    return (
        <div className="list">
            <div className="og-container">
                <Form
                    labelCol={{
                        span: 8,
                    }}
                    name="basic"
                    form={form}
                    initialValues={{
                        content: "",
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="inline"
                    size="large"
                >
                    <Col span={12} className="createArticleItem">
                        <Form.Item
                            label="Tiêu đề"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Trường này là bắt buộc",
                                },
                            ]}
                        >
                            <Input style={{ fontSize: "14px" }} placeholder="Nhập tiêu đề" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            className="createArticleItem"
                            label="Trạng thái"
                            name="visible"
                            rules={[
                                {
                                    required: true,
                                    message: "Trường này là bắt buộc",
                                },
                            ]}
                        >
                            <Select placeholder="Chọn" allowClear>
                                <Option value={true}>Hiện</Option>
                                <Option value={false}>Ẩn</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            className="createArticleItem"
                            label="Ảnh"
                            name="media"
                        //   required
                        //   rules={[
                        //     {
                        //       required: true,
                        //       message: "Trường này là bắt buộc",
                        //     },
                        //   ]}
                        >
                            {/* <Upload
                                accept="image/*"
                                listType="picture-card"
                                customRequest={({ onSuccess }) => onSuccess('ok')}
                                fileList={articleImages}
                                onChange={handleChangeUploadImage}
                                maxCount={1}
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload> */}
                            <div className="text-center" style={{ maxWidth: "180px" }}>
                                <img
                                    src={urlImage ? urlImage : NoImage}
                                    width="180"
                                    height={200}
                                    alt="avatar admin"
                                    className="mw-100 shadow-lg rounded-2 d-block"
                                />
                                <label className="position-relative bg-primary rounded-pill label mx-0">
                                    <span>Chọn Ảnh</span>
                                    <input
                                        type="file"
                                        onChange={onImageChange}
                                        className="filetype"
                                    />
                                </label>
                            </div>
                        </Form.Item>
                    </Col>
                    <div className="createArticleSubmit">
                        <Button size="middle" type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                        <Button
                            size="middle"
                            type="danger"
                            className="ms-2"
                            onClick={() => setIsEdit(false)}
                        >
                            Hủy
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default EditAds;
