import { useState, useEffect, useMemo } from 'react'
import { filterCocktails } from '../Utils/FilterCocktails';
import { validateForm } from '../Utils/ValidateForms';
import { fetchCocktails } from '../API/cocktailsAPI';

export const useCocktails = (gridRef:any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState<string | null>(''); 
  const [allCocktails, setAllCocktails] = useState<any[]>([])
  const [filteredCocktails, setFilteredCocktails] = useState<any[]>([])
  const [noResults, setNoResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false); // New state variable

  const popularCocktails = ["Pina Colada", "Daiquiri", "Martini", "Mojito", "Margarita", "Negroni", "Imperial Cocktail", "Old Fashioned", "Espresso Martini", "Manhattan", "Cosmopolitan", "Miami Vice"];

  useEffect(() => {
    const getCocktails = async () => {
      const cocktails = await fetchCocktails();
      setAllCocktails(cocktails);
      const popular = cocktails.filter((cocktail: any) => popularCocktails.includes(cocktail.strDrink));
      setFilteredCocktails(popular);
    }

    getCocktails();
  }, []);

  const memoizedPopularCocktails = useMemo(() => popularCocktails, [popularCocktails]);

  useEffect(() => {
    if (gridRef.current && filteredCocktails.length > 0 && hasSearched) { 
      window.scrollTo({
        top: gridRef.current.offsetTop - window.innerHeight * 0.2,
        behavior: 'smooth'
      });
    }
  }, [filteredCocktails, hasSearched]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm !== '') {
      setNoResults(false); 
    }
    if (!validateForm(newSearchTerm)) {
      setSearchError('Please enter only alphanumeric characters.');
    } else {
      setSearchError(null); 
    }
  };

  const [matchingCocktails, setMatchingCocktails] = useState<any[]>([]);

  const resetPage = () => {
    setCurrentPage(1);
  };

  const onSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim() === '') {
      setSearchError('Please enter a search term.'); 
    } else if (searchError === null) {
      const matching = filterCocktails(allCocktails, searchTerm);
      setMatchingCocktails(matching); 
      setSelectedCategory('Select Category');
      setFilteredCocktails(matching);
      setNoResults(matching.length === 0);
      setCategoryFilter(true);
      setHasSearched(true);
      resetPage();
    }
  }

  const onCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    let filtered;
    if (newCategory === 'Select Category') {
      filtered = matchingCocktails;
    } else {
      filtered = matchingCocktails.filter(cocktail => cocktail.strCategory === newCategory);
    }
    setFilteredCocktails(filtered);
  }
  return { searchTerm, onSearchChange, onSearchSubmit, allCocktails, filteredCocktails, searchError, noResults, onCategoryChange, categoryFilter, selectedCategory, currentPage, setCurrentPage, popularCocktails: memoizedPopularCocktails }
}

export default useCocktails