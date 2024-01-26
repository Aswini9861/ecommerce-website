import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Categoryproduct = () => {
  const Navigate = useNavigate()

  const { slug } = useParams();
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [category,setCataegory] = useState('')
  console.log(category)

  console.log(categoryProduct);

  const getCategoryProduct = async () => {
    try {
      const {data} = await axios.get(
        `/api/v1/product/category-product/${slug}`
      );
      setCategoryProduct(data?.products);
      setCataegory(data.products[0].category.name)

    } catch (error) {
      toast.error("Something went wrong while getting category wise product");
    }
  };
  useEffect(() => {
    getCategoryProduct();
  }, []);

  return (
    <Layout>

  <div className="row d-flex align-items-center justify-content-center">
    <div className="col-12 top-middle-content col-md-9">
      <h1>{category}</h1>
    </div>
    <div className="row">
              {categoryProduct?.map((p) => (
                <div className="col-md-3" key={p._id}>
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      style={{ height: "250px" }}
                      alt={p.name}
                    />
                    <div className="card-body">
                      <p className="card-title">
                        <b>Name:</b>
                        {p.name}
                      </p>
                      <p className="card-text">
                        <b>Description:</b>
                        {p.description.substring(0, 15)}....
                      </p>
                      <p className="card-text">
                        <b>Price:$</b>
                        {p.price}
                      </p>
                      <p className="card-text">
                        <b>Quantity:</b>
                        {p.quantity}
                      </p>
                      <div className="col-sm-12 text-center">
                        <button

                          className="btn btn-warning btn-md center-block "
                        >
                          Add To Cart
                        </button>
                        <button

                          className="btn btn-secondary btn-md center-block ms-2"
                          onClick={()=>Navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
  </div>


    </Layout>
  );
};

export default Categoryproduct;
