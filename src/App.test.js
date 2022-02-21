import React from 'react';
import { render, cleanup, prettyDOM, screen } from './setupTests';
import App from './App';

test('renders header', () => {
  render(<App />);
  const linkElement = screen.getByText(/TrueFLight/i);
  expect(linkElement).toBeInTheDocument();
});
