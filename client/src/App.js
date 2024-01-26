import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
import Pagenotfound from "./pages/pagenotfound";
import Policy from "./pages/Policy";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Layout from "./components/layout/Layout";
import Category from "./pages/category";
import Dashboard from "./pages/user/Dashboard";
import Privateroutes from "./components/Routes/private";
import Resetpassword from "./pages/Auth/Resetpassword";
import Privateadminroutes from "./components/Routes/privateadmin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Createcategory from "./pages/admin/Createcategory";
import Createproduct from "./pages/admin/Createproduct";
import User from "./pages/admin/User";
import Profile from "./pages/user/profile";
import Order from "./pages/user/order";
import Product from "./pages/admin/Product";
import ProductUpdate from "./pages/admin/productUpdate";
import Productdetails from "./pages/user/Productdetails";
import Categoryproduct from "./pages/Categoryproduct";
import CartPage from "./pages/CartPage";
import AdminOrder from "./pages/admin/AdminOrder";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/category" element={<Category />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<Categoryproduct />} />

        <Route path="/product/:slug" element={<Productdetails />} />
        <Route path="/dashboard" element={<Privateroutes />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/order" element={<Order />} />
        </Route>
        <Route path="/dashboard" element={<Privateadminroutes />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/createcategory" element={<Createcategory />} />
          <Route path="admin/createproduct" element={<Createproduct />} />
          <Route path="admin/product" element={<Product />} />
          <Route path="admin/product/:slug" element={<ProductUpdate />} />
          <Route path="admin/users" element={<User />} />
          <Route path="admin/adminorder" element={<AdminOrder />} />
        </Route>

        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </div>
  );
}

export default App;
