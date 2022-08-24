import React, { useEffect, useState } from "react";
import { GET, POST } from "../../../api/fetch";
import "../../../assets/css/addposts.css";
import { REQUEST_STATE } from "../../../configs";
import { Form } from "antd";
import { Button, Col, Input, Row, Upload } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Select } from "antd";
import CKEditor from "./CKEditor";
import { notification, Spin } from "antd";
import UploadImage from "./UploadImage";
import exportDefault from "redux/action";
import { useDispatch } from "react-redux";

const { Option } = Select;
function AddPosts() {
  const [categories, setCategories] = useState([]);
  const [createdPostId, setCreatedPostId] = useState(null);
  const [classifyNews, setClassifyNews] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATE.REQUEST);
  const [createPostStatus, setCreatePostStatus] = useState(
    REQUEST_STATE.INITIAL
  );
  const dispatch = useDispatch();
  const [articleImages, setArticleImages] = useState([]);
  const [content, setContent] = useState("");
  const [form] = Form.useForm();
  const access_token = localStorage.getItem("token");

  async function onFinish(params) {
    let createPostParams = {
      img_qoute: "",
      invisible: true,
      date_posted: new Date().toISOString(),
      ...params,
    };
    setCreatePostStatus(REQUEST_STATE.REQUEST);
    try {
      let createPostResult = await POST("/news/admin", createPostParams);
      setCreatedPostId(createPostResult.id);
      setCreatePostStatus(REQUEST_STATE.SUCCESS);
      notification.success({
        message: "Thành công",
      });
      await POST(
        "/noti/admin",
        {
          title: "Add News",
          content: "Successfully added news",
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      dispatch(
        exportDefault.addNotification({
          title: "Add News",
          content: "Successfully added news",
        })
      );
      window.location.reload();
    } catch (e) {
      notification.error({
        message: "Thất bại",
      });
      await POST(
        "/noti/admin",
        {
          title: "Add News",
          content: "Add news failed. Please try again",
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      dispatch(
        exportDefault.addNotification({
          title: "Add News",
          content: "Add news failed. Please try again",
        })
      );
      setCreatePostStatus(REQUEST_STATE.ERROR);
    }
  }

  async function onCategoryChange(categoryId) {
    setClassifyNews([]);
    form.setFieldsValue({
      id_classify: null,
    });
    let listClassifyNews = await GET(`/classify/category/${categoryId}`);
    setClassifyNews(listClassifyNews);
  }

  function handleChangeUploadImage({ fileList }) {
    console.log("fileList: ", fileList);
    setArticleImages(fileList);
  }

  function onContentChange(value) {
    form.setFieldsValue({
      content_news: value,
    });
    setContent(value);
  }

  function clearAfterSuccess() {
    form.resetFields();
    setContent("");
    setCreatePostStatus(REQUEST_STATE.INITIAL);
    setCreatedPostId(null);
  }

  useEffect(() => {
    (async () => {
      let listCategory = await GET("/category");
      setCategories(listCategory);
      setRequestStatus(REQUEST_STATE.SUCCESS);
    })();
  }, []);

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
              name="title_news"
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
          <Col span={12} className="createArticleItem">
            <Form.Item
              label="Tóm tắt"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc",
                },
              ]}
              name="title_quote"
            >
              <Input.TextArea
                style={{
                  fontSize: "14px",
                }}
                placeholder="Tóm tắt"
                rows={3}
              />
            </Form.Item>
          </Col>

          <Col span={16} className="createArticleItem">
            <Form.Item
              className="createArticleFormEditor"
              label="Nội dung"
              name="content_news"
              required
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      getFieldValue("content_news") == null ||
                      getFieldValue("content_news") == ""
                    ) {
                      return Promise.reject(
                        new Error("Trường này không được để trống")
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <CKEditor onTextChange={onContentChange} initContent={content} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="createArticleItem"
              label="Danh mục"
              name="id_category"
              required
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc",
                },
              ]}
            >
              <Select
                placeholder="Chọn danh mục"
                onChange={(value) => onCategoryChange(value)}
                allowClear
              >
                {categories.map((category) => {
                  if (category?.visible ?? false) {
                    return (
                      <Option key={category?.id} value={category?.id}>
                        {category?.name_category}
                      </Option>
                    );
                  }
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="createArticleItem"
              label="Thể loại"
              name="id_classify"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc",
                },
              ]}
            >
              <Select placeholder="Chọn" allowClear>
                {classifyNews.map((classifyNew) => {
                  if (classifyNew?.visible ?? false) {
                    return (
                      <Option key={classifyNew?.id} value={classifyNew?.id}>
                        {classifyNew?.name_classify}
                      </Option>
                    );
                  }
                })}
              </Select>
            </Form.Item>
          </Col>
          <div className="createArticleSubmit">
            <Button
              loading={createPostStatus === REQUEST_STATE.REQUEST}
              size="middle"
              type="primary"
              htmlType="submit"
              disabled={createPostStatus == REQUEST_STATE.SUCCESS}
            >
              Tạo
            </Button>
          </div>
        </Form>

        {createPostStatus == REQUEST_STATE.SUCCESS && (
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <UploadImage
              postId={createdPostId}
              clearAfterSuccess={clearAfterSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddPosts;
