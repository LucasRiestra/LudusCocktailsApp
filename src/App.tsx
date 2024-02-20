import { useCocktails } from './Hooks/useCocktails';
import { SearchForm } from './Components/SearchForm/SearchForm';
import { CocktailList } from './Components/CocktailCards/CocktailCards';
import  Header from './Components/Header/Header';
import './index.css';
import { useRef } from 'react';
import CategoriesFilter, { cocktailCategories } from './Components/CategoriesFilter/CategoriesFilter';
import Footer from './Components/Footer/Footer';

function App() {
  const gridRef = useRef(null);
  const { searchTerm, onSearchChange, onSearchSubmit, filteredCocktails, searchError, noResults, onCategoryChange, categoryFilter, selectedCategory, currentPage, setCurrentPage
   } = useCocktails(gridRef);

  return (
    <div className="App">
      <Header />
      <SearchForm searchTerm={searchTerm} onSearchChange={onSearchChange} onSearchSubmit={onSearchSubmit} searchError={searchError} noResults={noResults}/>
      {categoryFilter && <CategoriesFilter cocktailCategories={cocktailCategories} onCategoryChange={onCategoryChange} selectedCategory={selectedCategory}/>}
      <CocktailList gridRef={gridRef} cocktails={filteredCocktails} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Footer/>
    </div>
  );
}
export default App;