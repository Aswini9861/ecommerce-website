import { createContext, useContext, useState,useEffect } from "react";


const CartContext = createContext()

const CartProvider = ({children})=>{
    const [cart,setCart] = useState([])

    useEffect(() => {
        let existingData = localStorage.getItem('cart')
        if (existingData) setCart(JSON.parse(existingData))
      }, [])


    return(
        <CartContext.Provider value={[cart,setCart]}>
        {children}

        </CartContext.Provider>
    )

}
const useCart = ()=>useContext(CartContext)
export {useCart,CartProvider}