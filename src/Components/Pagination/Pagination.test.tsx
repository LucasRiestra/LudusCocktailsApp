import { render, fireEvent, waitFor } from '@testing-library/react';
import Pagination from './Pagination';

test('renders pagination with correct number of pages', () => {
  const handlePageChange = jest.fn();
  const { getAllByRole } = render(<Pagination totalPages={5} currentPage={1} onPageChange={handlePageChange} gridRef={{ current: null }} />);

  const buttons = getAllByRole('button');
  expect(buttons.length).toBe(5); 
});

test('calls onPageChange with new value when page changes', () => {
  const handlePageChange = jest.fn();
  const { getByText } = render(<Pagination totalPages={5} currentPage={1} onPageChange={handlePageChange} gridRef={{ current: null }} />);

  const button = getByText('2');
  fireEvent.click(button);

  expect(handlePageChange).toHaveBeenCalledWith(2);
});

test('disables prev button on first page and next button on last page', async () => {
  const handlePageChange = jest.fn();
  const { getByText, rerender } = render(<Pagination totalPages={5} currentPage={1} onPageChange={handlePageChange} gridRef={{ current: null }} />);

  const prevButton = getByText('prev');
  (expect(prevButton.closest('li'))as any).toHaveClass('disabled');

  const nextButton = getByText('next');
  for (let i = 0; i < 4; i++) {
    fireEvent.click(nextButton);
    await waitFor(() => expect(handlePageChange).toHaveBeenCalledTimes(i + 1));
    rerender(<Pagination totalPages={5} currentPage={i+2} onPageChange={handlePageChange} gridRef={{ current: null }} />);
  }

  (expect(nextButton.closest('li'))as any).toHaveClass('disabled');
});