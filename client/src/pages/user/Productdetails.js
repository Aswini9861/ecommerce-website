import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Productdetails = () => {
  const Navigate = useNavigate();
  const params = useParams();
  const [productDetails, setProductDeatils] = useState({});
  const [relatedDetails, setRealtedDeatils] = useState([]);

  console.log(relatedDetails);
  //console.log(productDetails)

  const getsingleProducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/single-product/${params.slug}`
      );

      setProductDeatils(data?.products);
      getsimilarProducts(data?.products._id, data?.products.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getsingleProducts();
  }, []);

  // get similar products

  const getsimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-products/${pid}/${cid}`
      );
      console.log(data);
      setRealtedDeatils(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${productDetails._id}`}
            className="card-img-top"
            alt={productDetails.name}
            height={"300"}
            width={"300px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {productDetails.name}</h6>
          <h6>Description : {productDetails.description}</h6>
          <h6>
            Price :
            {productDetails?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Category : {productDetails?.category?.name}</h6>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      {/* similar products */}

      <div className="col-md-9 mt-2">
        <div className="container">
          <p className="text-center">
            {relatedDetails.length < 1 && "No related products found"}
          </p>
        </div>

        <div>Products</div>
        <div className="row">
          {relatedDetails?.map((p) => (
            <div className="col-md-4" key={p._id}>
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
                    <button className="btn btn-secondary btn-md center-block ">
                      Add To Cart
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
export default Productdetails;
