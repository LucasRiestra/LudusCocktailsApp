import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders correctly', () => {
  render(<Footer />);
  const footerElement = screen.getByRole('contentinfo');
  (expect(footerElement)as any).toBeInTheDocument();
});

test('contains social media links', () => {
  render(<Footer />);
  const facebookLink = screen.getByRole('link', { name: /facebook/i });
  const twitterLink = screen.getByRole('link', { name: /twitter/i });
  const instagramLink = screen.getByRole('link', { name: /instagram/i });
  (expect(facebookLink)as any).toBeInTheDocument();
 (expect(twitterLink)as any).toBeInTheDocument();
  (expect(instagramLink) as any).toBeInTheDocument();
});

test('contains the website link', () => {
  render(<Footer />);
  const webLink = screen.getByRole('link', { name: /www.ludusglobal.com/i });
  (expect(webLink)as any).toBeInTheDocument();
});

test('contains the copyright text', () => {
  render(<Footer />);
  const copyrightText = screen.getByText(/© Developed by Lucas Riestra/i);
  (expect(copyrightText)as any).toBeInTheDocument();
});