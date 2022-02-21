import React from 'react';
import { Provider } from 'react-redux';

const ReduxProvider = ({ store, children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
