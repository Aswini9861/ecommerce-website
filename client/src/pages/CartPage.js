import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import '../styles/CartStyles.css'

const CartPage = () => {
  const Navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setloading] = useState(false);

  // get price
  const getallprice = () => {
    let price = 0;
    cart?.map((item) => (price += item.price));
    return price;
  };
  let allprice = getallprice();
  const handleRemove = (itemId) => {
    try {
      const myCart = [...cart];
      const index = myCart.findIndex((item) => item._id === itemId);
      console.log(index);
      myCart.splice(index, 1);

      // Update the state with the new array
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setloading(false);
      localStorage.removeItem("cart");
      setAuth([]);
      Navigate("/dashboard/user/order");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.error("Error processing payment:", error);
      setloading(false);
    }
  };

  return (
    <Layout>
      <h2 className="text-center">{`Hello ${
        auth?.token && auth?.user.name
      }`}</h2>
      <h3 className="text-center">
        {`${auth?.token && auth?.user.name}`
          ? `you have ${cart.length} in your cart`
          : `you have ${cart.length} item in your cart please login to to checkout`}
      </h3>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-6">
            {cart?.map((p) => (
              <div className="card" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  style={{ height: "250px" }}
                  alt={p.name}
                />

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
                <div className="">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleRemove(p._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-5 ">
            <div className=" w-75 text-center">
              <h4>Createproduct || Price || Checkout</h4>
              <h4 className="text-center">Total ${allprice}</h4>
              {auth?.user?.address? (
                <>
                  <h4>{auth?.user?.address}</h4>
                  <div
                    className="btn btn-outline-warning "
                    onClick={() => {
                      Navigate("/dashboard/user/profile");
                    }}
                  >
                    Update Profile
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="btn btn-outline-warning "
                    onClick={() => {
                      Navigate("/login", { state: "/cart" });
                    }}
                  >
                    Please login to checkout
                  </div>
                </>
              )}
            </div>
            <div className="mt-2">
              {!clientToken || !cart?.length? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Procesing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
