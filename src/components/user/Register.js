import React, { useState } from "react";
import "../../assets/css/register.css";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [errorSignup, setErrorSignUp] = useState();  
  const [successSignup, setSuccessSignup] = useState();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      phone: "",
      mail: "",
      role: "user",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .min(4, "must be at least 4 characters long")
        .max(15, "Must be 15 characters or less")
        .required("Please enter your Username"),
      password: yup
        .string()
        .min(6, "must be at least 6 characters long")
        .required("Please enter your password"),
      phone: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Please enter your phone"),
      mail: yup
        .string()
        .required("Please enter your mail")
        .min(4, "must be at least 4 characters long")
        .email("must be a valid email"),
    }),
    onSubmit: async (values) => {
      // console.log(values.role);
      try {
        await axios.post("http://localhost:5000/auth/signup", {
          username: values.username,
          password: values.password,
          phone: values.phone,
          mail: values.mail,
        });

        values.username = "";
        values.password = "";
        values.phone = "";
        values.mail = "";
        setSuccessSignup("You have successfully registered");
      } catch (err) {
        if (err.statusCode === 403) {
          setErrorSignUp(err.message);
        } else {
          console.log(err);
        }
      }
    },
  });

  function handleCancel() {
    navigate("/login");
  }
  return (
    <div className="form-register">
      <form className="form-login py-5 px-5" onSubmit={formik.handleSubmit}>
        <h1 className="text-center">Đăng ký</h1>
        {successSignup ? <p className="text-success">{successSignup}</p> : null}
        {errorSignup ? <p className="error-login">{errorSignup}</p> : null}
        <div className="form-text">
          <label className="mb-0">Tên đăng nhập</label>
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
          <label className="mb-0">Mật khẩu</label>
          <input
            name="password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="error">{formik.errors.password}</p>
          ) : null}
        </div>
        <div className="form-text">
          <label className="mb-0">Số điện thoại</label>
          <input name="phone" type="text" {...formik.getFieldProps("phone")} />
          {formik.touched.phone && formik.errors.phone ? (
            <p className="error">{formik.errors.phone}</p>
          ) : null}
        </div>
        <div className="form-text">
          <label className="mb-0">Địa chỉ email</label>
          <input name="mail" type="text" {...formik.getFieldProps("mail")} />
          {formik.touched.mail && formik.errors.mail ? (
            <p className="error">{formik.errors.mail}</p>
          ) : null}
        </div>
        <div className="clearfix">
          <button type="submit" className="signupbtn mb-2">
            Đăng ký
          </button>
          <button type="button" className="cancelbtn" onClick={handleCancel}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
export default Register;
