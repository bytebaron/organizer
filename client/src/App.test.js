import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

it("displays the table", () => {
  const {getByTestId} = render(<App />);
  expect(getByTestId("table")).toBeInTheDocument();
})

