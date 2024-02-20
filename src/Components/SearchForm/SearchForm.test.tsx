import { render, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';

test('renders search form', () => {
  const { getByPlaceholderText } = render(<SearchForm searchTerm="" onSearchChange={() => {}} onSearchSubmit={() => {}} />);
  const inputElement = getByPlaceholderText(/Search.../i);
  (expect(inputElement)as any).toBeInTheDocument();
});

test('calls onSearchChange when typing in the input', () => {
  const handleSearchChange = jest.fn();
  const { getByPlaceholderText } = render(<SearchForm searchTerm="" onSearchChange={handleSearchChange} onSearchSubmit={() => {}} />);
  const inputElement = getByPlaceholderText(/Search.../i);
  fireEvent.change(inputElement, { target: { value: 'test' } });
  expect(handleSearchChange).toHaveBeenCalled();
});

test('calls onSearchSubmit when clicking on the search icon', () => {
    const handleSearchSubmit = jest.fn();
    const { container } = render(<SearchForm searchTerm="" onSearchChange={() => {}} onSearchSubmit={handleSearchSubmit} />);
    const iconElement = container.querySelector('.search-icon');
    fireEvent.click(iconElement as Element);
    expect(handleSearchSubmit).toHaveBeenCalled();
  });

test('displays error message when searchError is provided', () => {
  const { getByText } = render(<SearchForm searchTerm="" onSearchChange={() => {}} onSearchSubmit={() => {}} searchError="Error message" />);
  const errorMessage = getByText(/Error message/i);
  (expect(errorMessage)as any).toBeInTheDocument();
});

test('displays no results message when noResults is true', () => {
  const { getByText } = render(<SearchForm searchTerm="" onSearchChange={() => {}} onSearchSubmit={() => {}} noResults />);
  const noResultsMessage = getByText(/I'm sorry but we haven't found a cocktail with those terms, try again with another one!/i);
  (expect(noResultsMessage)as any).toBeInTheDocument();
});