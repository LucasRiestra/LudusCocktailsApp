import { useCocktails } from './assets/Hooks/useCocktails';
import { SearchForm } from './assets/Components/SearchForm/SearchForm';


function App() {
  const { searchTerm, onSearchChange, onSearchSubmit } = useCocktails();

  return (
    <div className="App">
      <SearchForm searchTerm={searchTerm} onSearchChange={onSearchChange} onSearchSubmit={onSearchSubmit} />
    </div>
  );
}

export default App;