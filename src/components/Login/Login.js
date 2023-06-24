import React from "react";

import FOBAQ from "../images/FOBAQ.png";

const Login = () => {
  return (
    <div className="main-container">
      <div className="container ">
        <div className="row justify-content-left">
          <div className="col-md-3">
            <div className="card mt-5">
              <div className="text-center logo-container mt-2">
                <img className="logo-img" src={FOBAQ} alt="Logo" />
              </div>
              <div className="card-body">
                <h3 className="card-title text-center">Login</h3>
                <form>
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
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                  <div className="forget-create">
                    <div className="">
                      <span className="cursor-pointer forget-create-text">
                        Create account
                      </span>
                    </div>
                    <div className="">
                      <span className="cursor-pointer forget-create-text">
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
