import React from 'react'
import { SearchFormProps } from '../../Types/SearchFormProps'

export const SearchForm: React.FC<SearchFormProps> = ({ searchTerm, onSearchChange, onSearchSubmit }) => (
  <form onSubmit={onSearchSubmit}>
    <input type="text" value={searchTerm} onChange={onSearchChange} />
  </form>
)

export default SearchForm