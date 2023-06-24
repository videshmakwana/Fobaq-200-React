import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const FallBack = () => {
  const navigate = useNavigate();
  return (
    <div class="main-error-page d-flex flex-column align-items-center py-5 h-100v">
      <div className="mt-4 text-center">
        <h1 class="error-title">
          Woops! <br />
          Something went wrong :(
        </h1>
        <h2 class="error-subtitle">Have you tried again?</h2>
        <div className="d-flex justify-content-center mt-5">
          <button
            className=" btn-primary w-100 btn-style w-50 ms-2 btn-bg"
            onClick={() => window.location.reload()}
          >
            <FontAwesomeIcon icon={faRotateRight} />
            <span className="ms-2">Try again</span>
          </button>
          <button
            className=" btn-primary w-100 btn-style w-50 ms-2 btn-bg"
            onClick={() => navigate("/login")}
          >
            <FontAwesomeIcon icon={faHome} />
            <span className="ms-2">Back to login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FallBack;
