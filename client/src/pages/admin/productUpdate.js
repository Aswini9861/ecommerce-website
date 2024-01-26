import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Select, Space } from "antd";
import { useNavigate,useParams } from "react-router-dom";

let { Option } = Select;


const ProductUpdate = ()=>{
    const params = useParams()
    const NavLink = useNavigate()
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [pid, setPid] = useState("");


    const getsingleProducts = async()=>{

      try {
        const response = await axios.get(`/api/v1/product/single-product/${params.slug}`)
        if(response && response.data){
        const data = response.data;
        setName(data.products.name)
        setDescription(data.products.description)
        setPrice(data.products.price)
        setQuantity(data.products.quantity)
        setCategory(data.products.category._id)
        setShipping(data.products.shipping)
        setPid(data.products._id)
        }
      } catch (error) {
        console.log(error)

      }


    }


    useEffect(()=>{
        getsingleProducts()
        //eslint-disable-next-line
    },[])

    // update product
    const handleUpdate = async (e) => {
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
        const response = await axios.put(`/api/v1/product/update-product/${pid}`,formData);
        let data = response.data;
        if (data.success) {
          toast.success(`Product updated successfully`);
          NavLink('/dashboard/admin/product')
        }
      } catch (error) {
        toast.error("Something went wrong while updating product");
      }
    };


// delete product
const handleDelete = async (e) => {
  e.preventDefault();
  try {
    const answer = window.prompt('Are you sure you want to delete the product')
    if(!answer) return

      const response = await axios.delete(`/api/v1/product/delete-product/${pid}`);
    toast.success("Product deleted successfully");

      NavLink('/dashboard/admin/product')


  } catch (error) {
    toast.error("Something went wrong while deleting product");
  }

}



    // get category
  const getCategory = async () => {
    try {
      const response = await axios.get("/api/v1/category/category");
      const data = response.data;
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      toast.error("Something went wrong", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);


    return(
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
                    value={category}
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
                  {photo ? (
                    <img src={URL.createObjectURL(photo)} height={"200px"} alt="img upload" />

                  ):
                  (
                    <img src={`/api/v1/product/product-photo/${pid}`} height={"200px"} alt="img upload" />

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
                      value={shipping?'1':'0'}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                  </div>
                  <button className="btn btn-primary" onClick={handleUpdate}>
                    UpdateProduct
                  </button>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    DeleteProduct
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
}

export default ProductUpdate