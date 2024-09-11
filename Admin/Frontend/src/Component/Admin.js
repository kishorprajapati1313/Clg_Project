// Admin.js
import React from 'react';
import '../index.css';
import { Link, Navigate } from 'react-router-dom';

export const Admin = ({ setisadminlogin }) => {
  return (
    <div>
      
      {setisadminlogin?(
        <>
          Hello THere ...<br/>
          You can go to click this to Product page <Link to="/admin/product" >Click It</Link>
        </>

      ):(
      <Navigate to="/login" />
      )}
        
      
      
    </div>
  );
};
