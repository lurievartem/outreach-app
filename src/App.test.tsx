import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  render(<App />);
  const addFeed = screen.getByTestId('addFeed');
  expect(addFeed).toBeInTheDocument();
});
