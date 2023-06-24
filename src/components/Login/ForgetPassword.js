import React, { useContext, useState } from "react";
import FOBAQ from "../images/FOBAQ.png";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import * as Yup from "yup";
import { useFormik } from "formik";
import { forgotPassword } from "../Action/LoginAction";
import { AppContext } from "../../context/context";

const ForgetPassword = () => {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    console.log(data.email);
    setIsLoading(true);
    await forgotPassword(data.email)
      .then((response) => {
        console.log(response.data);
        setUser(response.data.id);
        if (response.data.id) {
          navigate("/reset-password");
        }
      })
      .catch((error) => {
        console.log(error);
        // Display error toast for invalid credentials
        // toast(toaster("ERROR", "Something went wrong!"));
      });
    setIsLoading(false);
  };
  const formik = useFormik({
    validateOnChange: true,
    initialValues: {
      email: "",
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
                <img className="logo-img " src={FOBAQ} alt="Logo" />
              </div>
              <div className="card-body">
                <h3 className="card-title text-center">Reset your password</h3>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      autoFocus
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
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
                      {isLoading ? <Loader /> : " Send Password Reset Email"}
                    </button>
                  </div>
                  <div className="forget-create-signup">
                    <span
                      className="cursor-pointer forget-create-text"
                      onClick={() => navigate("/login")}
                    >
                      Back to login
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

export default ForgetPassword;
