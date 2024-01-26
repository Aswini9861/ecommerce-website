import React from 'react'
import Footer from './footer'
import Header from './Header'
import {Helmet} from "react-helmet";
import { Toaster } from "react-hot-toast";


const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
    <Helmet>
  <meta charSet="UTF-8" />
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name={author} content="John Doe" />
  <title>{title}</title>
</Helmet>

    <Header/>
    <main style={{minHeight:'82vh'}}>{children}</main>
    <Toaster/>


    <Footer/>
    </div>
  )
}

Layout.defaultProps = {
  title:'Ecommerce app',
  description:'mern stack ecommerce project',
  keywords:'mern,react,node,mongodb',
  author:'aswini'
}

export default Layout