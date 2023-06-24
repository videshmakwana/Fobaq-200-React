import React, { useState } from "react";
import FOBAQ from "../images/FOBAQ.png";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { signUpAccount } from "../Action/LoginAction";
import { useFormik } from "formik";
import { setDataInLocalStorage } from "../../utils";
import Loader from "../Loader/Loader";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    await signUpAccount({ email: values.email, password: values.password })
      .then((response) => {
        setDataInLocalStorage(response.data);
        if (response.data.token) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/login");
      });
    setIsLoading(false);
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
                <h3 className="card-title text-center">Create new account</h3>
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
                      Create Password
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
                    <button
                      type="submit"
                      className={
                        isLoading
                          ? "btn btn-primary white-spineer"
                          : "btn btn-primary"
                      }
                    >
                      {isLoading ? <Loader /> : "Sign Up"}
                    </button>
                  </div>
                  <div className="forget-create-signup">
                    <span
                      className="cursor-pointer forget-create-text"
                      onClick={() => navigate("/login")}
                    >
                      Already have an account ?
                    </span>
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

export default Signup;
