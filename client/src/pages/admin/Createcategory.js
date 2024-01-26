import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Categoryform from "../../components/form/Categoryform";
import { Modal } from "antd";

const Createcategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [categoryid, setCategoryid] = useState("");



  // create category
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/category/create-category", {
        name,
      });

      if (response.data.success) {
        toast.success(`${name} Category created successfully`);
        getCategory();
      }
    } catch (error) {
      toast.error("Somwthing went wrong while creating category");
    }
  };

  // handle update category
  const Handleupdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/v1/category/update-category/${categoryid}`,
        {
          name: updatedName,
        }
      );
      let data = response.data;
      if (data.success) {
        toast.success(`${updatedName} is updated successfully`);
      }
      setIsModalOpen(false);
      getCategory();
    } catch (error) {
      toast.error("Something went wrong while updating category");
    }
  };

  // delete category
  const handleDelete = async (categoryid,e) => {
    try {
      // e.preventDefault();
      const response = await axios.delete(
        `/api/v1/category/delete-category/${categoryid}`
      );
      let data = response.data
      if(data.success){
        toast.success(`Category is deleted successfully`)
        getCategory()
      }

    } catch (error) {
      toast.error("Something went wrong while deleting category");
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

  return (
    <>
      <Layout title={"create category"}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <Adminmenu />
            </div>

            <div className="col-md-9 mt-2">
              <Categoryform
                value={name}
                handleSubmit={HandleSubmit}
                setValue={setName}
              />
              <div className=" w-75 ">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Category</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.map((c) => (
                      <React.Fragment key={c._id}>
                        <tr>
                          <td>{c.name}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => {
                                setIsModalOpen(true);
                                setUpdatedName(c.name);
                                setCategoryid(c._id);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={(e) => {
                                handleDelete(c._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal
                open={isModalOpen}
                onCancel={() => {
                  setIsModalOpen(false);
                }}
                footer={null}
              >
                <Categoryform
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={Handleupdate}
                />
              </Modal>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Createcategory;
