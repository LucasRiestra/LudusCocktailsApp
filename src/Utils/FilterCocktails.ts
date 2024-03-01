export const filterCocktails = (allCocktails: any[], searchTerm: string) => {
  const searchWords = searchTerm.toLowerCase().split(' ');


  const isMatch = (text: string) => 
    searchWords.every(word => 
      text.toLowerCase().split(' ').some((textWord: string) => textWord.startsWith(word))
    );

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
      if (ingredient && isMatch(ingredient)) {
        return true;
      }
    }

    if (isMatch(cocktail.strDrink)) {
      return true;
    }
    return false;
  })
  matchingCocktails.sort((a, b) => {
    if (a.strAlcoholic === 'Non alcoholic' && b.strAlcoholic !== 'Non alcoholic') {
      return -1;
    }
    if (a.strAlcoholic !== 'Non alcoholic' && b.strAlcoholic === 'Non alcoholic') {
      return 1;
    }
    return 0;
  });
  
  return matchingCocktails;
};