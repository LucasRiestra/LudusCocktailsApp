import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { filterCocktails } from '../Utils/FilterCocktails';
import { validateForm } from '../Utils/ValidateForms';


export const useCocktails = (gridRef:any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState<string | null>(''); 
  const [allCocktails, setAllCocktails] = useState<any[]>([])
  const [filteredCocktails, setFilteredCocktails] = useState<any[]>([])
  const [noResults, setNoResults] = useState(false);
  
  const alphabet = useMemo(() => 'abcdefghijklmnopqrstuvwxyz'.split(''), [])
  const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f="

  useEffect(() => {
    const fetchCocktails = async () => {
      let cocktails: any[] = []

      for (let letter of alphabet) {
        const response = await axios.get(`${url}${letter}`)
        if (response.data.drinks) {
          cocktails = [...cocktails, ...response.data.drinks]
        }
      }

      setAllCocktails(cocktails)
    }

    fetchCocktails()
  }, [alphabet])

  useEffect(() => {
    if (gridRef.current && filteredCocktails.length > 0) {
      window.scrollTo({
        top: gridRef.current.offsetTop - window.innerHeight * 0.1,
        behavior: 'smooth'
      });
    }
  }, [filteredCocktails]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm !== '') {
      setNoResults(false); 
    }
    if (!validateForm(newSearchTerm)) { // Si el término de búsqueda no es válido
      setSearchError('Please enter only alphanumeric characters.'); // Establece el mensaje de error
    } else {
      setSearchError(null); // Si es válido, asegúrate de que no haya mensaje de error
    }
  };

  const onSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchError === null) {
      const matchingCocktails = filterCocktails(allCocktails, searchTerm);
      setFilteredCocktails(matchingCocktails);
      setNoResults(matchingCocktails.length === 0);
      console.log(matchingCocktails);
    }
  }

  return { searchTerm, onSearchChange, onSearchSubmit, allCocktails, filteredCocktails, searchError, noResults}
}

export default useCocktails