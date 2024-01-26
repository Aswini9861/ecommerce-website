import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";

const Login = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const Location = useLocation();

  const Handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data && res.data.success) {
        toast.success("Register Successfully");
        localStorage.setItem("auth", JSON.stringify(res.data));

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        Navigate(Location.state || "/");
      } else {
        toast.error("Invalid password or email");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={'login'}>
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

            <label htmlFor="fullName">Password:</label>
            <input
              type="text"
              id="Password"
              name="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />

            <button style={{ backgroundColor: "green" }} onClick={()=>{Navigate('/resetpassword')}} type="button">
              ResetPassword
            </button>

            <button style={{ backgroundColor: "green" }} type="submit" defaultValue="Submit">
            Login
          </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
