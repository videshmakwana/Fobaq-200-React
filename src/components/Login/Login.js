import React from "react";
import FOBAQ from "../images/FOBAQ.png";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { setDataInLocalStorage } from "../../utils";
import { loginVerifier } from "../Action/LoginAction";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    await loginVerifier(values)
      .then((response) => {
        if (response.data.token) {
          setDataInLocalStorage(response.data);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    validateOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Email address must be a valid email")
        .required("Please enter your email address"),
    }),
    onSubmit: handleSubmit,
  });
  return (
    <div className="main-container">
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <div className="card mt-5">
              <div className="text-center logo-container mt-2">
                <img className="logo-img" src={FOBAQ} alt="Logo" />
              </div>
              <div className="card-body">
                <h3 className="card-title text-center">Login</h3>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      autoFocus
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                  <div className="forget-create">
                    <div className="">
                      <span
                        className="cursor-pointer forget-create-text"
                        onClick={() => navigate("/signup")}
                      >
                        Create account
                      </span>
                    </div>
                    <div className="">
                      <span
                        className="cursor-pointer forget-create-text"
                        onClick={() => navigate("/password/forget")}
                      >
                        Forgot password ?
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
