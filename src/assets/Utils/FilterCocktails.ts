export const filterCocktails = (allCocktails: any[], searchTerm: string) => {
    let matchingCocktails = allCocktails.filter((cocktail: any) => {
      // Exclude cocktails with more than 6 ingredients
      let ingredientCount = 0;
      for (let i = 1; i <= 15; i++) {
        if (cocktail[`strIngredient${i}`]) {
          ingredientCount++;
        }
      }
      if (ingredientCount > 6) {
        return false;
      }
      
      // Special case: search for non-alcoholic cocktails
      if (searchTerm.toLowerCase() === 'no alcohol' || searchTerm.toLowerCase() === 'without alcohol') {
        return cocktail.strAlcoholic === 'Non alcoholic';
      }
      // Search by ingredient (in all ingredients, partial match)
      for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        if (ingredient && ingredient.toLowerCase().split(' ').some((word: any) => word.includes(searchTerm.toLowerCase()))) {
          return true;
        }
      }
  
      // Search by name (partial match)
      if (cocktail.strDrink.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
      return false;
    });
  
    // If searching for non-alcoholic cocktails, select 6 at random
    if (searchTerm.toLowerCase() === 'no alcohol' || searchTerm.toLowerCase() === 'without alcohol') {
      matchingCocktails = matchingCocktails.sort(() => 0.5 - Math.random()).slice(0, 6);
    } else {
  
      // Sort cocktails to put non-alcoholic ones first
      matchingCocktails.sort((a, b) => {
        if (a.strAlcoholic === 'Non alcoholic' && b.strAlcoholic !== 'Non alcoholic') {
          return -1;
        }
        if (a.strAlcoholic !== 'Non alcoholic' && b.strAlcoholic === 'Non alcoholic') {
          return 1;
        }
        return 0;
      });
    }
  
    return matchingCocktails;
  };