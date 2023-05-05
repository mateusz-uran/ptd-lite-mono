import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './src/App';

test('App renders properly', () => {
  const wrapper = render(<App />);
  expect(wrapper).toBeTruthy();
})