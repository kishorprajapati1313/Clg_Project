import React, { useEffect, useState } from 'react'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import Product from './Pages/Product'
import Login from './Pages/Login'
import Signin from './Pages/Signin'
import Viewproduct from './Pages/Viewproduct'
import Viewproducttest from './Pages/Viewproducttest'
import Test from './Pages/test'
import Test2 from './Pages/test2'
import Cart from './Pages/Cart'
import Navbar, { getuser } from './Component/Navbar'
import Orderform from './Pages/Orderform'
import Placeorder from './Pages/Placeorder'
import Orderconform from './Pages/Orderconform'
import App from './App'
import THome from './TestingofUIs/Pages/THome'
import SearchedPrduct from './Pages/SearchedPrduct'

const Approute = () => {
    const [user, setuser] = useState(getuser())
    useEffect(() => {
        setuser(getuser())
    }, [])
    return (
        <>
        <Routes>
            <Route path="/" element={ <Home />} />
            
            <Route path="/navbar" element={ <Navbar />} />
            <Route path="/category/:cat" element={ <Product />} />
            <Route path="/login" element={ <Login />} />
            <Route path="/signin" element={ <Signin />} />
            {/* <Route path="/viewproduct/:productid" element={ <Viewproduct />} /> */}
            <Route path="/viewproduct/:productid" element={ <Viewproducttest />} />

            <Route path="/serch_product/:suggestion" element={ <SearchedPrduct/>} />

            {user ? <Route path="/cart/:id" element={<Cart />} /> : <Route path="/login" element={<Login />} />}
            {user ? <Route path="/orderform" element={<Orderform />} /> : <Route path="/login" element={<Login />} />}
            {user ? <Route path="/placeorder" element={<Placeorder />} /> : <Route path="/login" element={<Login />} />}
            {user ? <Route path="/orderstatus/:userid" element={<Orderconform />} /> : <Route path="/login" element={<Login />} />}
            
            {/* Test Of Three-D models
            <Route path="/test" element={ <Test />} />
            <Route path="/test2" element={ <Test2 />} /> */}
        </Routes>
           
        </>
    )
}

export default Approute