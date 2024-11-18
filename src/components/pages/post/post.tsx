import React from 'react';
import { Outlet } from 'react-router-dom';

const Post = () => {
  return (
    <div className=''>
      <Outlet /> {/* This is where nested routes will be rendered */}
    </div>
  );
};

export default Post;