import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";
import Spinner from "../../utlis/Spinner";

const Privateroutes = () => {
  const Navigate = useNavigate();
  const [ok, setok] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authcheck = async () => {
      const res = await axios.get("http://localhost:8080/api/v1/auth/protected-routes");
      //console.log(res);

      if (res.data.ok) {
        setok(true);
      } else {
        setok(false);
      }
    };
    if (auth?.token) authcheck();

  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default Privateroutes;
