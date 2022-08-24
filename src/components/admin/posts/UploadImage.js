import React, { useEffect, useState } from 'react';
import { GET, POST, UPLOAD } from '../../../api/fetch';
import "../../../assets/css/addposts.css";
import { REQUEST_STATE } from '../../../configs';
import { Form } from 'antd';
import { Button, Col, Input, Row, Upload } from 'antd';
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import CKEditor from './CKEditor';
import { notification, Spin } from 'antd';

const { Option } = Select;
export default function ({ postId, clearAfterSuccess }) {
    const [uploadImageStatus, setUploadImageStatus] = useState(REQUEST_STATE.INITIAL);

    const [articleImages, setArticleImages] = useState([]);
    const [form] = Form.useForm();

    async function onFinish(params) {
        setUploadImageStatus(REQUEST_STATE.REQUEST);
        try {
            const uploadImage = await UPLOAD(`/news/admin/upload/${postId}`, params.media.file.originFileObj);
            clearAfterSuccess();
            setArticleImages([]);
            notification.success({
                message: 'Thành công',
            });
            setUploadImageStatus(REQUEST_STATE.SUCCESS);
        } catch (e) {
            setUploadImageStatus(REQUEST_STATE.ERROR);
        }

    }
    function handleChangeUploadImage({ fileList }) {
        setArticleImages(fileList);
    }
    return (
        <Form
            labelCol={{
                span: 8,
            }}
            name="basic"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            layout="inline"
            size="large"
        >
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
                    <Upload
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
                    </Upload>
                </Form.Item>
            </Col>
            <div className="createArticleSubmit">
                <Button
                    size="middle"
                    type="primary"
                    htmlType="submit"
                    loading={uploadImageStatus === REQUEST_STATE.REQUEST}
                >
                    Tải lên
                </Button>
            </div>
        </Form>
    )
}

