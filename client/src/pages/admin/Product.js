import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  const getAllProduct = async () => {
    try {
      const response = await axios.get("/api/v1/product/products");

      const data = response?.data;
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      toast.error("Something went wrong", error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <Adminmenu />
        </div>
        <div className="col-md-9 mt-2">
          <div>Products</div>
          <div className="row">
            {products.map((p) => (
              <div className="col-md-3" key={p._id}>
                <Link
                  className="product-card"
                  to={`/dashboard/admin/product/${p.slug}`}
                >
                  <div className="card" style={{ width: "16rem" }}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      style={{ height: "250px" }}
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                      <p className="card-text">{p.price}</p>
                      <p className="card-text">{p.quantity}</p>
                     {/*  <a href="#" className="btn btn-primary">
                        Go somewhere
                      </a> */}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
