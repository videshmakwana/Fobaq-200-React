import React from "react";
import FOBAQ from "../images/FOBAQ.png";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const SetPassword = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    formik.resetForm();
    navigate("/login");
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
                    <button type="submit" className="btn btn-primary">
                      Continue
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
