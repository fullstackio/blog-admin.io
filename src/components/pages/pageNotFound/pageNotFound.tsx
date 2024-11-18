import React, { useState, useEffect } from "react";
import './pageNotFound.css';
import pageNotFound from './../../../assets/images/404.jpg';
import { Link } from "react-router-dom";
import { useHeading } from './../../../context/HeadingContext';

const PageNotFound = () => {
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading('Dynamic Heading for SomeComponent');

   

    
  }, [setHeading]);

  return (
    <div className="pagenotfound-wrapper">
        <div className="inner-layout-wrapper">
          <div className="pagenotfound-banner">
            <img src={pageNotFound} alt="Page Not Found" />
          </div>
          <div className="pagenotfound-back">
            
            <Link to="/dashboard"  className="font-bold p-button back-to-home">
            <i className="pi pi-arrow-left"></i> Back To Dashboard
</Link>
            </div>
        </div>      
    </div>
  );
};

export default PageNotFound;
