import { useCocktails } from './assets/Hooks/useCocktails';
import { SearchForm } from './assets/Components/SearchForm/SearchForm';
import { CocktailList } from './assets/Components/CocktailCards/CocktailCards';
import  Header from './assets/Components/Header/Header';
import './index.css';

function App() {
  const { searchTerm, onSearchChange, onSearchSubmit, filteredCocktails } = useCocktails();

  return (
    <div className="App">
      <Header />
      <SearchForm searchTerm={searchTerm} onSearchChange={onSearchChange} onSearchSubmit={onSearchSubmit} />
      <CocktailList cocktails={filteredCocktails} />
    </div>
  );
}

export default App;