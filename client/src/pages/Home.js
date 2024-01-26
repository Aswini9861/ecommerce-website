import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import Price from "../components/form/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";

const imageperrow = 6;
const Home = () => {
  const Navigate = useNavigate();
  const [cart,setCart] = useCart()
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [next, setNext] = useState(imageperrow);
  const [searchterm, setSearchterm] = useState("");

  const getAllProduct = async () => {
    try {
      const response = await axios.get("/api/v1/product/products");

      const data = response?.data;
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      toast.error("Something went wrong", error);
    }
  };

  // get category
  const getCategory = async () => {
    try {
      const response = await axios.get("/api/v1/category/category");
      const data = response.data;
      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      toast.error("Something went wrong", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  // Handle filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProduct();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/filter-product", {
        checked,
        radio,
      });
      setProducts(data?.product);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // added loadmore functionality
  const handlemoreImage = () => {
    setNext(next + imageperrow);
  };

  // added filter process

  const filteringproduct = () => {
    const productFilter = products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .trim()
          .includes(searchterm.toLowerCase().trim()) ||
        product.description
          .toLowerCase()
          .trim()
          .includes(searchterm.toLowerCase().trim())
    );
    if (searchterm.length > 0) {
      setProducts(productFilter);
    }
  };
  useEffect(() => {
    if (searchterm.length > 0) {
      filteringproduct();
    } else {
      getAllProduct();
    }
  }, [searchterm.length]);

  return (
    <>
      <Layout>
        <form className="d-flex my-2 my-lg-0" style={{ marginLeft: 400 }}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ width: "200px" }}
            onChange={(e) => setSearchterm(e.target.value)}
          />
          {/* <button className="btn btn-outline-success my-2 my-sm-0"
    onClick={HandleFilter}
    >
      Search
    </button> */}
        </form>
        <div className="row">
          <div className="col-md-2 ms-3" style={{ width: "16rem" }}>
            <h3>Category Name</h3>
            {category?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
            <div className="mt-5 ">
              <Radio.Group
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              >
                {Price?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.price}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset filter
            </button>
          </div>

          <div className="col-md-9 mt-2">
            <div>Products</div>
            <div className="row">
              {products?.slice(0, next)?.map((p) => (
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
                        <button className="btn btn-warning btn-md center-block "
                        onClick={()=>{setCart([...cart,p])
                        localStorage.setItem("cart",JSON.stringify([...cart,p]))
                          toast.success('product added successfully')
                          }}

                        >
                          Add To Cart
                        </button>
                        <button
                          className="btn btn-secondary btn-md center-block ms-2"
                          onClick={() => Navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {next < products?.length && (
              <div className="mx-auto" style={{ width: "200px" }}>
                <button
                  onClick={handlemoreImage}
                  type="button"
                  className="btn btn-warning"
                >
                  Load More...
                </button>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
