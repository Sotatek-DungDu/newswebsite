import React, { useState, useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import NoAvatar from "../../assets/images/no-avatar.png";
import exportDefault from "redux/action";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";

function Profile() {
  const [initialValues, setInitialValues] = useState({
    username: "",
    phone: "",
    mail: "",
    profileImg: "",
    role: ""
  });
  const id = localStorage.getItem("id_admin_current");
  const access_token = localStorage.getItem("token");
  const [urlImage, setUrlImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const dispatch = useDispatch();
  const listUser = useSelector(state => state.users)

  useEffect(() => {
    const getUser = async () => {
      try {
        const resp = await axios.get(`http://localhost:5000/auth/admin`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        dispatch(exportDefault.setUser(resp.data.sort((a, b) => (a.id < b.id ? 1 : -1))))
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [listUser.loading, dispatch, access_token]);

  useEffect(() => {
    const getUser = async () => {
      try {
        //const access_token = localStorage.getItem("token");
        // console.log(access_token);
        const resp = await axios.get(`http://localhost:5000/auth/${id}`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (resp.data.profileImg !== null) {
          const arrImage = resp.data.profileImg.split("\\");
          const urlImg = `http://localhost:5000/userimages/${arrImage[2]}`;
          setUrlImage(urlImg);
        }
        setInitialValues({
          username: resp.data.username,
          phone: resp.data.phone,
          mail: resp.data.mail,
          profileImg: resp.data.profileImg,
          role: resp.data.role
        });
        // console.log(resp.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [listUser.loading, access_token, id]);

  const onImageChange= (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setUrlImage(URL.createObjectURL(event.target.files[0]));
      // console.log(urlImage);
    }
  }
  const formik = useFormik({
    initialValues: {
      username: "",
      phone: "",
      mail: "",
      profileImg: ""
    },
    validationSchema: yup.object({
      phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Please enter your phone"),
      mail: yup.string().required("Please enter your mail").min(4, 'must be at least 4 characters long').email('must be a valid email'),
    }),
    onSubmit: async (values) => {
      try {
        let formData = new FormData();
        formData.append("file", file);
        // console.log(file)
        await axios.put(`http://localhost:5000/auth/admin/${id}`, {
          // password: ,
          mail: values.mail,
          phone: values.phone,
          role: initialValues.role
        },{
          headers: { Authorization: `Bearer ${access_token}` },
        });
        await axios.post("http://localhost:5000/noti/admin", {
          title: "Cập nhật thông tin người dùng",
          content: "Cập nhật thông tin thành công",
        },{
          headers: { Authorization: `Bearer ${access_token}` },
        });
        dispatch(
          exportDefault.addNotification({
            title: "Cập nhật thông tin người dùng",
          content: "Cập nhật thông tin thành công",
          })
        );
        notification.success({
          message: "Thành công"
        })
        await axios.post("http://localhost:5000/auth/upload", formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${access_token}` },
        });
        setIsEdit(false);
        dispatch(
          exportDefault.editUser({
            id: id,
            phone: values.phone,
            mail: values.mail,
            role: values.role,
            profileImg: values.profileImg,
          })
        );

      } catch (error) {
        if(error.statusCode === 500) {
          dispatch(
            exportDefault.editUser({
              id: id,
              phone: values.phone,
              mail: values.mail,
              role: values.role,
              // profileImg: values.profileImg,
            })
          );
          setIsEdit(false);
          // window.location.reload();
        }else {
        await axios.post(
          "http://localhost:5000/noti/admin",
          {
            title: "Cập nhật thông tin người dùng",
            content: "Cập nhật thông tin thất bại. Vui lòng thử lại",
          },
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );
        dispatch(
          exportDefault.addNotification({
            title: "Cập nhật thông tin người dùng",
            content: "Cập nhật thông tin thất bại. Vui lòng thử lại",
          })
        );
        console.log(error);
        notification.error({
          message: "Thất bại"
        })}
      }
    },
  });
  // console.log(urlImage)
  //console.log(initialValues);
  return (
    <div className="my-sm-5 mx-sm-3 main__content">
      <Container className="shadow-lg py-sm-3">
        <h3 className="px-sm-4">Thông tin cá nhân</h3>
        {!isEdit && <button
          className="btn btn-primary float-end me-5"
          onClick={() => {
            setIsEdit(true);
            // formik.values.username = "";
            formik.values.phone = initialValues.phone;
            formik.values.mail = initialValues.mail;
          }}
        >
          Sửa
        </button>}
        <form className="row form-login py-5" onSubmit={formik.handleSubmit}>
          {/* {errorLogin ? <p className="error-login">{errorLogin}</p> : null} */}
          <Col sm={9}>
            <div className="form-text">
              <label>Tên người dùng</label>
              <input
                name="username"
                type="text"
                value={
                  initialValues.username
                }
                onChange={formik.handleChange}
                style={{cursor: 'default'}}
                // {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username ? (
                <p className="error">{formik.errors.username}</p>
              ) : null}
            </div>
            <div className="form-text">
              <label>Số điện thoại</label>
              <input
                name="phone"
                type="text"
                value={
                  isEdit === false ? initialValues.phone : formik.values.phone
                }
                onChange={formik.handleChange}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <p className="error">{formik.errors.phone}</p>
              ) : null}
            </div>
            <div className="form-text">
              <label>Địa chỉ email</label>
              <input
                name="mail"
                type="text"
                value={
                  isEdit === false ? initialValues.mail : formik.values.mail
                }
                onChange={formik.handleChange}
              />
              {formik.touched.mail && formik.errors.mail ? (
                <p className="error">{formik.errors.mail}</p>
              ) : null}
            </div>
          </Col>
          <Col className="form-text ms-sm-4 ps-sm-5 text-center">
            <img src={urlImage ? urlImage : NoAvatar} width="180" height={200} alt="avatar admin" className="mw-100 shadow-lg rounded-circle"/>
            {isEdit === true && (
            <label className="position-relative bg-primary rounded-pill label mx-0">
              <span>Đổi ảnh</span>
              <input type="file" onChange={onImageChange} className="filetype" />
            </label>)}
          </Col>
          {isEdit === true && (
            <div>
              <button
                className="btn btn-danger me-3"
                onClick={() => setIsEdit(false)}
              >
                Hủy
              </button>
              <input type="submit" className="btn btn-warning" value="Lưu" />
            </div>
          )}
        </form>
      </Container>
    </div>
  );
}

export default Profile;
