import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";
import Spinner from "../../utlis/Spinner";

const Privateadminroutes = () => {
  const navigate = useNavigate();
  const [ok, setok] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authcheck = async () => {
      try {
        if (!auth?.token) {
          //navigate("/");
          return;
        }
        const res = await axios.get(
          "http://localhost:8080/api/v1/auth/admin-protected-routes"
        );
        //console.log(res);
        if (res.data.ok) {
          setok(true);
        } else {
          setok(false);
        }
      } catch (error) {
        console.log(error);
       /*  if (error.response && error.response.status === 401) {
          navigate("/");
        } else {
          setok(false);
        } */
      }
    };
    authcheck();
  }, [auth?.token, navigate]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default Privateadminroutes;
