import React, { useEffect, useState } from "react";
import { GET, POST, PUT } from "../../../api/fetch";
import "../../../assets/css/addposts.css";
import { REQUEST_STATE } from "../../../configs";
import { Form } from "antd";
import { Button, Col, Input } from "antd";
// import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Select } from "antd";
import CKEditor from "./CKEditor";
import { notification } from "antd";
import UploadImage from "./UploadImage";

const { Option } = Select;
function EditPosts({ setIsEdit, idEdit }) {
  const [categories, setCategories] = useState([]);
  const [createdPostId, setCreatedPostId] = useState(null);
  const [classifyNews, setClassifyNews] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATE.REQUEST);
  const [createPostStatus, setCreatePostStatus] = useState(
    REQUEST_STATE.INITIAL
  );

  const [articleImages, setArticleImages] = useState([]);
  const [content, setContent] = useState("");
  const [form] = Form.useForm();
  useEffect(() => {
    //console.log(form.setFieldsValue({title:}))
    const getData = async () => {
      try {
        if (idEdit) {
          const resp = await GET(`/news/${idEdit}`);
          // const category = await GET(`/news/${idEdit}`);
          setContent(resp.content_news);
          form.setFieldsValue({
            title_news: resp.title_news,
            title_quote: resp.title_quote,
            id_category: resp.id_category,
            id_classify: resp.id_classify,
          });
          onCategoryChange(resp.id_category);
        }
        // console.log(resp.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [idEdit]);

  async function onFinish(params) {
    const token = localStorage.getItem("token");
    let createPostParams = {
      invisible: true,
      ...params,
    };
    // setCreatePostStatus(REQUEST_STATE.REQUEST);
    try {
      await PUT(`/news/admin/${idEdit}`, createPostParams, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEdit(false);
      //   setCreatedPostId(createPostResult.id);
      //   setCreatePostStatus(REQUEST_STATE.SUCCESS);

      notification.success({
        message: "Th??nh c??ng",
      });
      await POST(
        "/noti/admin",
        {
          title: "Edit News",
          content: "Successfully edited news",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.reload();
    } catch (e) {
      notification.error({
        message: "Th???t b???i",
      });
      setCreatePostStatus(REQUEST_STATE.ERROR);
      await POST(
        "/noti/admin",
        {
          title: "Edit News",
          content: "Update news failed. Please try again",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
  }

  async function onCategoryChange(categoryId) {
    let listClassifyNews = await GET(`/classify/category/${categoryId}`);
    setClassifyNews(listClassifyNews);
  }

  // function handleChangeUploadImage({ fileList }) {
  //     console.log('fileList: ', fileList);
  //     setArticleImages(fileList);
  // }

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
              label="Ti??u ?????"
              name="title_news"
              rules={[
                {
                  required: true,
                  message: "Tr?????ng n??y l?? b???t bu???c",
                },
              ]}
            >
              <Input style={{ fontSize: "14px" }} placeholder="Nh???p ti??u ?????" />
            </Form.Item>
          </Col>
          <Col span={12} className="createArticleItem">
            <Form.Item
              label="T??m t???t"
              rules={[
                {
                  required: true,
                  message: "Tr?????ng n??y l?? b???t bu???c",
                },
              ]}
              name="title_quote"
            >
              <Input.TextArea
                style={{
                  fontSize: "14px",
                }}
                placeholder="T??m t???t"
                rows={3}
              />
            </Form.Item>
          </Col>

          <Col span={16} className="createArticleItem">
            <Form.Item
              className="createArticleFormEditor"
              label="N???i dung"
              name="content_news"
              required
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      getFieldValue("content_news") == null ||
                      getFieldValue("content_news") === ""
                    ) {
                      return Promise.reject(
                        new Error("Tr?????ng n??y kh??ng ???????c ????? tr???ng")
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
              label="Danh m???c"
              name="id_category"
              required
              rules={[
                {
                  required: true,
                  message: "Tr?????ng n??y l?? b???t bu???c",
                },
              ]}
            >
              <Select
                placeholder="Ch???n danh m???c"
                onChange={(value) => onCategoryChange(value)}
                allowClear
              >
                {categories.map((category) => {
                  if (category?.visible ?? false) {
                    return (
                      <Option key={category.id} value={category?.id}>
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
              label="Th??? lo???i"
              name="id_classify"
              rules={[
                {
                  required: true,
                  message: "Tr?????ng n??y l?? b???t bu???c",
                },
              ]}
            >
              <Select placeholder="Ch???n" allowClear>
                {classifyNews.map((classifyNew) => {
                  if (classifyNew?.visible ?? false) {
                    return (
                      <Option key={classifyNew.id} value={classifyNew?.id}>
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
              disabled={createPostStatus === REQUEST_STATE.SUCCESS}
            >
              C???p nh???t
            </Button>
            <Button
              size="middle"
              type="danger"
              className="ms-2"
              onClick={() => setIsEdit(false)}
            >
              H???y
            </Button>
          </div>
        </Form>

        {/* {createPostStatus === REQUEST_STATE.SUCCESS && (
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
        )} */}
      </div>
    </div>
  );
}

export default EditPosts;
