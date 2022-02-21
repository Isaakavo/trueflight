/** * @jest-environment node */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import { render } from '@testing-library/react';

import ReduxProvider from './providers/ReduxProvider';
import RouterProvider from './providers/RouterProvider';
import { store } from './store';



afterAll(() => jest.clearAllMocks());

const AllTheProviders = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <RouterProvider>{children}</RouterProvider>
    </ReduxProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export * from '@testing-library/jest-dom';

export { customRender as render };
