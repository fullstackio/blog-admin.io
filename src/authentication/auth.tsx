import React from 'react';
import { Outlet } from 'react-router-dom';
import './auth.css';

const Auth = () => {
  return (
    <div className='auth_page_wrpper h-full-vh'>
      <Outlet /> {/* This is where nested routes will be rendered */}
    </div>
  );
};

export default Auth;