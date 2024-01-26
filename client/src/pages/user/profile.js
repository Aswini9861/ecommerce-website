import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Usermenu from "../../components/layout/UserMenu";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";
const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //console.log(auth);
  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);


  const Handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/update-profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      console.log(data)
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updateProfile });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updateProfile;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(`Profile updated successfully`);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout title={"create category"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>

          <div className="col-md-9 mt-2">
            <div className=" w-75 ">
              <div>profile</div>
              <div className="container">
                <h2>Profile Update</h2>
                <form action="" method="post" onSubmit={Handlesubmit}>
                  <input
                    placeholder="fullName"
                    type="text"
                    id="fullName"
                    name="fullName"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <input
                    placeholder="Enter your Email"
                    type="text"
                    id="Email"
                    name="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    disabled
                  />
                  <input
                    placeholder="Enter your Password"
                    type="text"
                    id="Password"
                    name="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <input
                    placeholder="Enter your Phone"
                    type="text"
                    id="Phone"
                    name="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />

                  <input
                    placeholder="Enter your Address"
                    type="text"
                    id="Address"
                    name="Address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />

                  <button
                    style={{ backgroundColor: "green" }}
                    type="submit"
                    defaultValue="Submit"
                  >
                    UpdateProfile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
