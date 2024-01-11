import React from 'react';
import { render, screen } from '@testing-library/react';
import AddFeed from './AddFeed';

test('renders AddFeed', () => {
  render(<AddFeed  addHandler={() => {}}/>);
  expect(screen.getByTestId('addFeed')).toBeInTheDocument();
  expect(screen.getByTestId("addFeed-input")).toBeInTheDocument();
  expect(screen.getByTestId("addFeed-submit")).toBeInTheDocument();
});
