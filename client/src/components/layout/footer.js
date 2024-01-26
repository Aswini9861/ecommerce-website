import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">

      <div className="bg-dark text-light p-3 align-content-center">
        <h4 className="text-center">All Rights Reserved © Aswini</h4>
        <p className="text-center mt-3">
          <Link className=" text-light px-3" to={"/about"}>
            About
          </Link>|
          <Link className="text-light px-3" to={"/contact"}>
            Contact
          </Link>|
          <Link className="text-light px-3" to={"/policy"}>
            privacy Policy
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Footer;
