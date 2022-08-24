import React, { useState } from "react";
import "../../assets/css/login.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import exportDefault from "../../redux/action";
import axios from "axios";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required("Please Enter your Username or Email"),
      password: yup.string().required("Please enter your password"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:5000/auth/login", {
          username: values.username,
          password: values.password,
        });
        localStorage.setItem("token", res.data.access_token);
        // console.log(res.data);
        const resp = await axios.get("http://localhost:5000/auth/admin", {
          headers: { Authorization: `Bearer ${res.data.access_token}` },
        });
        dispatch(exportDefault.setUser(resp.data));
        // console.log(resp.data)
        resp.data.forEach((user) => {
          const { username, id } = user;
          if (values.username === username) {
            localStorage.setItem("id_admin_current", id)
          }
        })
        navigate("/admin");
        // const api = 'your api';
        // const token = JSON.parse(sessionStorage.getItem('data'));
        // const token = user.data.id; /*take only token and save in token variable*/
        // await axios.get("http://localhost:5000/auth/admin" , { headers: {"Authorization" : `Bearer ${res.data.access_token}`} }).then(respon => {
        // console.log(respon.data);
      } catch (err) {
        // if (err.response.status === 403) {
        //   //alert("home");
        //   navigate("/");
        if (err.statusCode === 404) {
          setErrorLogin(err.message);
        } else if (err.statusCode === 403) {
          navigate("/");
        }
      }
    },
  });
  return (
    <div className="container-login">

      <form
        className="form-login py-5 shadow-lg"
        onSubmit={formik.handleSubmit}
      >
        <h1>Đăng nhập</h1>
        {errorLogin ? <p className="error-login">{errorLogin}</p> : null}
        <div className="form-text">
          <label>Tên đăng nhập</label>
          <input
            name="username"
            type="text"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <p className="error">{formik.errors.username}</p>
          ) : null}
        </div>
        <div className="form-text">
          <label>Mật khẩu</label>
          <input
            name="password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="error">{formik.errors.password}</p>
          ) : null}
        </div>
        <div className="resetpassword">
          <a href="/resetpassword">Quên mật khẩu</a>
        </div>
        <div className="mb-3 py-2">
          <input type="submit" className="btn btn-primary" value="Đăng nhập" />
        </div>
        <div>
          Bạn không có tài khoản ? <a href="/register">Đăng ký ngay</a>
        </div>
      </form>
    </div>
  );
}
export default Login;
