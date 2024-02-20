
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('banner render', () => {
  render(<Header />);
  const headerElement = screen.getByRole('banner');
  (expect(headerElement) as any).toBeInTheDocument();
});

test('logo render', () => {
  render(<Header />);
  const logoElement = screen.getByAltText('Logo');
  (expect(logoElement) as any).toBeInTheDocument();
});