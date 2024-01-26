import axios from "axios"
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";




export const UseCategory = ()=>{
    const [categories,setCategories] = useState([])

    useEffect(()=>{
        getCategory()
    },[])

    const getCategory = async()=>{
        try {
            const response = await axios.get("/api/v1/category/category");
            const data = response.data;
            if (data.success) {
                setCategories(data.category);
            }
          } catch (error) {
            toast.error("Something went wrong", error);
          }
    }
    return categories

}

