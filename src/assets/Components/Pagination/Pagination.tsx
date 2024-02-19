import React, { RefObject } from 'react';
import './Pagination.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  gridRef: RefObject<HTMLDivElement>;
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange, gridRef }) => {
  const pageNeighbours = 2;

  const leftLimit = Math.max(currentPage - pageNeighbours, 1);
  const rightLimit = Math.min(currentPage + pageNeighbours, totalPages);

  const pages = Array.from({ length: rightLimit - leftLimit + 1 }, (_, i) => leftLimit + i);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    if (gridRef.current) {
      window.scrollTo({
        top: gridRef.current.offsetTop - window.innerHeight * 0.2,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav aria-label="Page navigation" className='pagination-nav'>
      <ul className="pagination-container">
        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>prev</button>
        </li>
        {leftLimit > 1 && <li key="left-ellipsis" className="page-item">...</li>}
        {pages.map(page => (
          <li key={page} className={`page-item ${page === currentPage && 'active'}`}>
            <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
          </li>
        ))}
        {rightLimit < totalPages && <li key="right-ellipsis" className="page-item">...</li>}
        <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>next</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;