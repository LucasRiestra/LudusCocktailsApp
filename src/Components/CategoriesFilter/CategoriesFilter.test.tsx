import { render, fireEvent } from '@testing-library/react';
import CategoriesFilter, { cocktailCategories } from './CategoriesFilter';

test('renders select with correct options', () => {
  const handleCategoryChange = jest.fn();
  const { getByLabelText, getAllByRole } = render(<CategoriesFilter onCategoryChange={handleCategoryChange} selectedCategory="" cocktailCategories={[]} />);

  const select = getByLabelText('Default select example');
  (expect(select)as any).toBeInTheDocument();

  const options = getAllByRole('option');
  expect(options.length).toBe(cocktailCategories.length + 1); 
});

test('calls onCategoryChange with new value when selection changes', () => {
  const handleCategoryChange = jest.fn();
  const { getByLabelText } = render(<CategoriesFilter onCategoryChange={handleCategoryChange} selectedCategory="" cocktailCategories={[]} />);

  const select = getByLabelText('Default select example');
  fireEvent.change(select, { target: { value: 'Beer' } });

  expect(handleCategoryChange).toHaveBeenCalledWith('Beer');
});