export const filterCocktails = (allCocktails: any[], searchTerm: string) => {
    let matchingCocktails = allCocktails.filter((cocktail: any) => {
      let ingredientCount = 0;
      for (let i = 1; i <= 15; i++) {
        if (cocktail[`strIngredient${i}`]) {
          ingredientCount++;
        }
      }
      if (ingredientCount > 6) {
        return false;
      }
      
      if (searchTerm.toLowerCase() === 'no alcohol' || searchTerm.toLowerCase() === 'without alcohol') {
        return cocktail.strAlcoholic === 'Non alcoholic';
      }
      for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        if (ingredient && ingredient.toLowerCase().split(' ').some((word: any) => word.startsWith(searchTerm.toLowerCase()))) {
          return true;
        }
      }
  
      if (cocktail.strDrink.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        return true;
      }
      return false;
    });
  
    if (searchTerm.toLowerCase() === 'no alcohol' || searchTerm.toLowerCase() === 'without alcohol') {
      matchingCocktails = matchingCocktails.sort(() => 0.5 - Math.random()).slice(0, 6);
    } else {
  
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