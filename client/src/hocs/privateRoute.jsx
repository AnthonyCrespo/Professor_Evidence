import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => (
  <Route
    {...rest}
    element={<Element />}
  />
);

export default PrivateRoute;
