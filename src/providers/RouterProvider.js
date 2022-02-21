import React from 'react';
import { HashRouter } from 'react-router-dom';

const RouterProvider = ({ children }) => {
  return <HashRouter>{children}</HashRouter>;
};

export default RouterProvider;
