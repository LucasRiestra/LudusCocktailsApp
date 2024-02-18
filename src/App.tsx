import { useCocktails } from './assets/Hooks/useCocktails';
import { SearchForm } from './assets/Components/SearchForm/SearchForm';
import { CocktailList } from './assets/Components/CocktailCards/CocktailCards';
import  Header from './assets/Components/Header/Header';
import './index.css';
import { useRef } from 'react';

function App() {
  const gridRef = useRef(null);
  const { searchTerm, onSearchChange, onSearchSubmit, filteredCocktails, searchError } = useCocktails(gridRef); // Añade searchError aquí

  return (
    <div className="App">
      <Header />
      <SearchForm searchTerm={searchTerm} onSearchChange={onSearchChange} onSearchSubmit={onSearchSubmit} searchError={searchError} />
      <CocktailList gridRef={gridRef} cocktails={filteredCocktails} />
    </div>
  );
}
export default App;