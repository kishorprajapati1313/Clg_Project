// routes.js
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Admin } from './Component/Admin';
import { Login } from './Component/Login';
import { Sign } from './Component/Sign';
import { Addproduct } from './Component/Product/Addproduct';
import Team from './S-Comp/Team';
import Contacts from './S-Comp/Contacts';
import Invoice from './S-Comp/Invoice';
import Form1 from './S-Comp/Form';
import Calendar from './S-Comp/Calender';
import Faq from './S-Comp/Faq';
import Bar from './S-Comp/bar';
import Pie from './S-Comp/Pie';
import Line from './S-Comp/Line';
import Dashboard from './Scene/Dashboard/Dashboard';
import Product from './Component/Product';
import Updateproduct from './Component/Product/Updateproduct';
import Allorder from './Component/order/Allorder';
import TestBar from './S-Comp/bar copy';


const Approutes = () => {
  const [isadminlogin, setisadminlogin] = useState(false);

  return (
    <Routes>
      {/* HOME PAGE */}
      <Route path='/' element={<Login setisadminlogin={setisadminlogin} />} index />
      <Route path='/sign' element={<Sign />} />
      <Route path='/login' element={<Login setisadminlogin={setisadminlogin} />} index />
      <Route path='/admin/dashboard' element={isadminlogin ? (<Dashboard />) : (<Navigate to="/login" />)} />

      {/* DATA */}
      <Route path='/admin/team' element={isadminlogin ? (<Team />) : (<Navigate to="/login" />)} />
      <Route path='/admin/Contacts' element={isadminlogin ? (<Contacts />) : (<Navigate to="/login" />)} />
      <Route path='/admin/invoice' element={isadminlogin ? (<Invoice />) : (<Navigate to="/login" />)} />


      {/* PAGES */}
      <Route path='/admin/form' element={isadminlogin ? (<Form1 />) : (<Navigate to="/login" />)} />
      <Route path='/admin/calender' element={isadminlogin ? (<Calendar />) : (<Navigate to="/login" />)} />
      <Route path='/admin/faq' element={isadminlogin ? (<Faq />) : (<Navigate to="/login" />)} />

      {/* PRODUCT PAGES*/}
      <Route path='/admin/product' element={isadminlogin ? (<Product />) : (<Navigate to="/login" />)} />
      <Route path='/admin/product/addproduct' element={isadminlogin ? (<Addproduct />) : (<Navigate to="/login" />)} />
      {/* <Route path='/admin/allorder' element={isadminlogin ? (<Allorder />) : (<Navigate to="/login" />)} /> */}
      <Route path='/admin/allorder' element={<Allorder />} />


      {/* CHARTS */}
      {/* <Route path='/admin/bar' element={isadminlogin ? (<Bar />) : (<Navigate to="/login" />)} /> */}
      <Route path='/admin/pie' element={isadminlogin ? (<Pie />) : (<Navigate to="/login" />)} />
      <Route path='/admin/line' element={isadminlogin ? (<Line />) : (<Navigate to="/login" />)} />


      {/* <Route path='/admin/product' element={<Product />} /> 
       <Route path='/admin/dashboard' element={<Dashboard />} />
      <Route path='/admin/team' element={<Team />} />
      <Route path='/admin/contacts' element={<Contacts />} />
      <Route path='/admin/invoice' element={<Invoice />} />
      <Route path='/admin/form' element={<Form1 />} />
      <Route path='/admin/calender' element={< Calendar/>} />
      <Route path='/admin/faq' element={< Faq/>} />
      <Route path='/admin/bar' element={< Bar/>} />
      <Route path='/admin/pie' element={< Pie/>} />
      <Route path='/admin/line' element={< Line/>} /> */}

      <Route path='/admin/bar' element={< Bar/>} />
      {/* <Route path='/admin/bar' element={< TestBar />} /> */}


    </Routes>
  );
};

export default Approutes;
