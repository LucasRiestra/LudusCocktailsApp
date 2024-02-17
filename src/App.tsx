import { useState, useEffect, useMemo } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [allCocktails, setAllCocktails] = useState<any[]>([])

  const alphabet = useMemo(() => 'abcdefghijklmnopqrstuvwxyz'.split(''), [])

  useEffect(() => {
    const fetchCocktails = async () => {
      let cocktails: any[] = []

      for (let letter of alphabet) {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
        if (response.data.drinks) {
          cocktails = [...cocktails, ...response.data.drinks]
        }
      }

      setAllCocktails(cocktails)
    }

    fetchCocktails()
  }, [alphabet])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    let matchingCocktails = allCocktails.filter((cocktail: any) => {
      // Exclude cocktails with more than 6 ingredients
      let ingredientCount = 0
      for (let i = 1; i <= 15; i++) {
        if (cocktail[`strIngredient${i}`]) {
          ingredientCount++
        }
      }
      if (ingredientCount > 6) {
        return false
      }
  
      // Special case: search for non-alcoholic cocktails
      if (searchTerm.toLowerCase() === 'no alcohol' || searchTerm.toLowerCase() === 'without alcohol') {
        return cocktail.strAlcoholic === 'Non alcoholic'
      }
  
      // Search by first letter
      if (cocktail.strDrink.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        return true
      }
  
      // Search by ingredient (in all ingredients, partial match)
      for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`]
        if (ingredient && ingredient.toLowerCase().split(' ').some((word:any) => word.includes(searchTerm.toLowerCase()))) {
          return true
        }
      }
  
      // Search by name (partial match)
      if (cocktail.strDrink.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true
      }
      return false
    })

    
  
    // If searching for non-alcoholic cocktails, select 6 at random
    if (searchTerm.toLowerCase() === 'no alcohol' || searchTerm.toLowerCase() === 'without alcohol') {
      matchingCocktails = matchingCocktails.sort(() => 0.5 - Math.random()).slice(0, 6)
    } else {
      // Otherwise, take only the first 6 cocktails
      matchingCocktails = matchingCocktails.slice(0, 6)
  
      // Sort cocktails to put non-alcoholic ones first
      matchingCocktails.sort((a, b) => {
        if (a.strAlcoholic === 'Non alcoholic' && b.strAlcoholic !== 'Non alcoholic') {
          return -1
        }
        if (a.strAlcoholic !== 'Non alcoholic' && b.strAlcoholic === 'Non alcoholic') {
          return 1
        }
        return 0
      })
    }
  
    console.log(matchingCocktails)
  }
  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" value={searchTerm} onChange={handleSearchChange} />
        
      </form>
    </>
  )
}

export default App