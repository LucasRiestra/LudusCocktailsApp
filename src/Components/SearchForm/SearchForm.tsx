import { FaSearch } from 'react-icons/fa';
import { SearchFormProps } from '../../Types/SearchFormProps';
import "./SearchForm.css";
import { useEffect, useState } from 'react';

export const SearchForm: React.FC<SearchFormProps> = ({ searchTerm, onSearchChange, onSearchSubmit, searchError, noResults }) => {
  const [showingPopular, setShowingPopular] = useState(true);

  const handleIconClick = () => {
    const formEvent = new Event('submit', { bubbles: true, cancelable: true });
    onSearchSubmit(formEvent as unknown as React.FormEvent);
  };

  useEffect(() => {
    setShowingPopular(searchTerm === '');
  }, [searchTerm]);

  return (
    <div>
      <h1 className='app-title'>Party<br />Cocktails</h1>
      <form onSubmit={onSearchSubmit} className='search-form'>
        <div className="input-container" style={{ position: 'relative' }}>
          <FaSearch className="search-icon" onClick={handleIconClick} /> 
          <input 
            type="text" 
            className='input' 
            spellCheck="false"
            value={searchTerm} 
            onChange={onSearchChange} 
            placeholder="Search..." 
            onFocus={(e) => e.target.placeholder = ""} 
            onBlur={(e) => e.target.placeholder = "search..."} 
          />
        </div>
        <div>
        {searchError && <p className="error-message">{searchError}</p>}
          {noResults && <p className="no-results-message">I'm sorry but we haven't found a cocktail with those terms, try again with another one!</p>}
        </div>
      </form>
      <div className='indications'>
        <p>Search for a cocktail by name or ingredient...</p>
        <p>HEY!<br /> if you drive, better drink it without alcohol</p>
      </div>
      <div>
      {showingPopular && <h5 className='popular'>See the most popular Cocktails</h5>}
      </div>
    </div>
  );
};

export default SearchForm;