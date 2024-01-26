import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Spinner = ({ path = "login" }) => {
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(3);
  const Location = useLocation();

  useEffect(() => {
    const spinnerTimeout = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    countdown === 0 && navigate(`/${path}`, { state: Location.pathname });

    return () => clearInterval(spinnerTimeout);
  }, [countdown, navigate, Location, path]);
  return (
    <div>
      <div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "60vh" }}
        >
          <h2>{`Redirecting in ${countdown} seconds...`}</h2>

          <div className="spinner-border" role="status"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
