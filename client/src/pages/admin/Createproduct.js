import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Select, Space } from "antd";
import { useNavigate } from "react-router-dom";

let { Option } = Select;

const Createproduct = () => {
  const NavLink = useNavigate()
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");


  // get category
  const getCategory = async () => {
    try {
      const response = await axios.get("/api/v1/category/category");
      const data = response?.data;
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      toast.error("Something went wrong", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  // create product
  const handleCreate = async (e) => {

    e.preventDefault();
    const formData = new FormData();

     formData.append('name', name,)
     formData.append('description', description)
     formData.append('price', price)
     formData.append('quantity', quantity)
     formData.append('shipping', shipping)
     photo && formData.append('photo', photo)
     formData.append('category', category)


    try {
      const response = await axios.post(`/api/v1/product/create-product`,formData);
      console.log(response)
      let data = response.data;
      if (data.success) {
        toast.success(`Product is created successfully`);
        NavLink('/dashboard/admin/product')

      }
    } catch (error) {
      toast.error("Something went wrong while creating product");
    }
  };

  return (
    <Layout title={"create product"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>

          <div className="col-md-9 mt-2">
            <div className=" w-75 ">
              <div>Createproduct</div>

              <Space wrap>
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  showSearch
                  defaultValue="Select"
                  style={{
                    width: 380,
                  }}
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
              </Space>
            </div>
            <div className="mb3 text-center">
              <div className="">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    //setFiles(URL.createObjectURL(e.target.files[0]));
                    setPhoto(e.target.files[0])
                  }}
                />
                {photo && (
                  <img src={URL.createObjectURL(photo)} height={"200px"} alt="img upload" />

                )}
              </div>
              <div className="col-md-6 text-center">
                <input
                  placeholder="Name of the product"
                  type="text"
                  id="productName"
                  name="productName"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
                <input
                  placeholder="Description of the product"
                  type="text"
                  id="productDescription"
                  name="productDescription"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
                <input
                  placeholder="price of the product"
                  type="text"
                  id="productPrice"
                  name="productPrice"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
                <input
                  placeholder="quantity of the product"
                  type="text"
                  id="productQuantity"
                  name="productQuantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  required
                />
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select shipping"
                    size="large"
                    className="form-select "
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <button className="btn btn-primary" onClick={handleCreate}>
                  CreateProduct
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Createproduct;
