import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { filterCocktails } from '../Utils/FilterCocktails';

export const useCocktails = (gridRef:any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allCocktails, setAllCocktails] = useState<any[]>([])
  const [filteredCocktails, setFilteredCocktails] = useState<any[]>([])

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

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const onSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const matchingCocktails = filterCocktails(allCocktails, searchTerm);
    setFilteredCocktails(matchingCocktails);
    console.log(matchingCocktails);

    if (gridRef.current) {
      window.scrollTo({
        top: gridRef.current.offsetTop -window.innerHeight * 0.1,
        behavior: 'smooth'
      });
    }

  }

  return { searchTerm, onSearchChange, onSearchSubmit, allCocktails, filteredCocktails }
}

export default useCocktails