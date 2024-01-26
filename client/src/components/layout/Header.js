import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { UseCategory } from "../../pages/hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();


  const categories = UseCategory();

  const HandlecLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            🛒Ecommerce
          </Link>
          <div className="ml-auto me-5">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse ml-auto"
              id="navbarNavDropdown"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/"}
                  >
                    Home
                  </Link>
                </li>

                {/* <Link className="nav-link active" aria-current="page" to={"/category"}>Category</Link> */}
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle active"
                    to={"/"}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Category
                  </Link>
                  <ul className="dropdown-menu">
                    <Link
                      className="nav-link active "
                      to={"/category"}
                      role="button"
                      style={{ marginLeft: "7px" }}
                    >
                      All Category
                    </Link>

                    {categories.map((c) => (
                      <li key={c._id}>
                        <Link
                          className="dropdown-item"
                          to={`/category/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {!auth.user ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active" to={"/login"}>
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" to={"/signup"}>
                        Signup
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle active"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth.user?.name}
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          style={{ marginLeft: "10px" }}
                          className="nav-link active"
                          to={"/login"}
                          onClick={HandlecLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}

                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/cart"}
                  >
                  Cart
                    <Badge count={cart?.length} showZero></Badge>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
