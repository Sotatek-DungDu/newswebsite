import React, { useEffect, useState } from "react";
import { GET, POST } from "../../../api/fetch";
import "../../../assets/css/addads.css";
import { REQUEST_STATE } from "../../../configs";
import { Form } from "antd";
import { Button, Col, Input, Row, Upload, message } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Select } from "antd";
import axios from "axios";
import NoImage from "../../../assets/images/no-avatar.png";

const { Option } = Select;

function AddAds() {
  // const [categories, setCategories] = useState([]);
  // const [classifyNews, setClassifyNews] = useState([]);
  // const [requestStatus, setRequestStatus] = useState(REQUEST_STATE.REQUEST);
  const token = localStorage.getItem("token");
  const [articleImages, setArticleImages] = useState([]);
  const [urlImage, setUrlImage] = useState(null);
  const [file, setFile] = useState();
  const [form] = Form.useForm();
  const access_token = localStorage.getItem("token");

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const access_token = localStorage.getItem("token");
  //       // console.log(access_token);
  //       const id  = 0;
  //       const resp = await axios.get(`http://localhost:5000/news/${id}`, {
  //         headers: { Authorization: `Bearer ${access_token}` },
  //       });
  //       if (resp.data.profileImg !== null) {
  //         const arrImage = resp.data.profileImg.split("\\");
  //         const urlImg = `http://localhost:5000/userimages/${arrImage[2]}`;
  //         setUrlImage(urlImg);
  //       }
  //       // console.log(resp.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUser();
  // }, []);


  const onFinish = async (params) => {
    // event.preventDefault();
    try {
      //   const id = localStorage.getItem("id_admin_current");
      //   console.log(articleImages[0])
      await POST(
        "/adv/admin",
        { title_advertise: params.title, visible: params.visible },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      let formData = new FormData();
      formData.append("file", file);
      const resp = await GET(`/adv`);
      // console.log(resp)
      const postImage = async (id) => {
        await POST(`/adv/admin/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        });
      };
      resp.map((element) => {
        if (element.title_advertise === params.title) {
          postImage(element.id);
        }
      });
      await axios.post("http://localhost:5000/noti/admin", {
        title: "Add Advertisement",
        content: "Successfully added advertisement"
      }, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      window.location.reload();
      // console.log(file)
      //console.log(token);
      //   console.log(params);
      console.log("params: ", params);
    } catch (err) {
      if (err.statusCode === 500) {
      } else {
        console.log(err);
      }
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setUrlImage(URL.createObjectURL(event.target.files[0]));
      // console.log(urlImage);
    }
  };

  return (
    <div className="main__content">
      <div className="container-fluid">
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
              required
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc",
                },
              ]}
            >
              {/* <Upload
                // action={"http://localhost:5000/adv/admin/1"}
                accept="image/*"
                listType="picture-card"
                customRequest={({ onSuccess }) => onSuccess("ok")}
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
              Tạo
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddAds;
