import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axois from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";

const Login = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const Handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axois.post("/api/v1/auth/resetpassword", {
        email,
        newpassword,
        answer,
      });
      console.log(res);
      if (res && res.data && res.data.success === true) {
        toast.success("Password Reset Successfully");
        //localStorage.setItem("auth", JSON.stringify(res.data));

        Navigate("/login");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={'reset password'}>
      <div>
        <div className="container">
          <form action="submit_form.php" method="post" onSubmit={Handlesubmit}>
            <label htmlFor="fullName">Email:</label>
            <input
              type="text"
              id="Email"
              name="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor="new password">NewPassword:</label>
            <input
              type="text"
              id="Password"
              name="Password"
              onChange={(e) => setnewPassword(e.target.value)}
              value={newpassword}
              required
            />

            <label htmlFor="Answer">Answer:</label>
            <input
              type="text"
              id="answer"
              name="answer"
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              required
            />

            <button
              style={{ backgroundColor: "green" }}
              type="submit"
              defaultValue="Submit"
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
