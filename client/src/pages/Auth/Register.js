import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const Handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const getdata = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (getdata.data.success) {
        toast.success("Register Successfully");
        Navigate("/login");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={'register'}>
      <div className="container">
        <h2>Register</h2>
        <form action="submit_form.php" method="post" onSubmit={Handlesubmit}>
          <input
            placeholder="fullName"
            type="text"
            id="fullName"
            name="fullName"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <input
            placeholder="Enter your Email"
            type="text"
            id="Email"
            name="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            placeholder="Enter your Password"
            type="text"
            id="Password"
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <input
            placeholder="Enter your Phone"
            type="text"
            id="Phone"
            name="Phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            required
          />

          <input
            placeholder="Enter your Address"
            type="text"
            id="Address"
            name="Address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            required
          />

          <input
            placeholder="Enter your favourite sports"
            type="text"
            id="Answer"
            name="Answer"
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            required
          />

          <button style={{ backgroundColor: "green" }} type="submit" defaultValue="Submit">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
