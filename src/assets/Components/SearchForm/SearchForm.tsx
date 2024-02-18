import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { SearchFormProps } from '../../Types/SearchFormProps';
import "./SearchForm.css";

export const SearchForm: React.FC<SearchFormProps> = ({ searchTerm, onSearchChange, onSearchSubmit }) => (
  <div>
    <h1 className='app-title'>Party<br />Cocktails</h1>
    <form onSubmit={onSearchSubmit} className='search-form'>
      <div style={{ position: 'relative' }}>
        <FaSearch className="search-icon" />
        <input 
          type="text" 
          className='input' 
          spellCheck="false"
          value={searchTerm} 
          onChange={onSearchChange} 
          placeholder="Search..." 
          style={{ textAlign: 'center' }} 
          onFocus={(e) => e.target.placeholder = ""} 
          onBlur={(e) => e.target.placeholder = "search..."} 
        />
      </div>
    </form>
    <div className='indications'>
      <p>Search for a cocktail by name or ingredient...</p>
      <p>HEY!<br /> if you drive, better drink it without alcohol</p>
    </div>
  </div>
);

export default SearchForm;