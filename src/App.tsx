import { useCocktails } from './assets/Hooks/useCocktails';
import { SearchForm } from './assets/Components/SearchForm/SearchForm';
import { CocktailList } from './assets/Components/CocktailCards/CocktailCards';
import  Header from './assets/Components/Header/Header';
import './index.css';
import { useRef } from 'react';
import CategoriesFilter, { cocktailCategories } from './assets/Components/CategoriesFilter/CategoriesFilter';

function App() {
  const gridRef = useRef(null);
  const { searchTerm, onSearchChange, onSearchSubmit, filteredCocktails, searchError, noResults, onCategoryChange, categoryFilter
   } = useCocktails(gridRef);

  return (
    <div className="App">
      <Header />
      <SearchForm searchTerm={searchTerm} onSearchChange={onSearchChange} onSearchSubmit={onSearchSubmit} searchError={searchError} noResults={noResults}/>
      {categoryFilter && <CategoriesFilter cocktailCategories={cocktailCategories} onCategoryChange={onCategoryChange}/>}
      <CocktailList gridRef={gridRef} cocktails={filteredCocktails}  />
    </div>
  );
}
export default App;