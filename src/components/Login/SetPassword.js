import React, { useContext, useState } from "react";
import FOBAQ from "../images/FOBAQ.png";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { setUserPassword } from "../Action/LoginAction";
import { AppContext } from "../../context/context";

const SetPassword = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    console.log(values);
    setIsLoading(true);
    await setUserPassword({
      userId: user,
      password: values?.password,
      confirmPassword: values?.cnfpassword,
    })
      .then((response) => {
        if (response.data.type === "Success") {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  const formik = useFormik({
    validateOnChange: true,
    initialValues: {
      password: "",
      cnfpassword: "",
    },
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
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      autoFocus
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cnfpassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="cnfpassword"
                      placeholder="Enter password"
                      onChange={formik.handleChange}
                      value={formik.values.cnfpassword}
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
                      {isLoading ? <Loader /> : "Continue"}
                    </button>
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

export default SetPassword;
