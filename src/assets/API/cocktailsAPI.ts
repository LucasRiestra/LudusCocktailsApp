import axios from 'axios';

export const fetchCocktails = async () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=";

  const requests = alphabet.map(letter => axios.get(`${url}${letter}`));

  const responses = await Promise.all(requests);

  console.log(`Number of API requests: ${responses.length}`);

  const cocktails = responses.map(response => response.data.drinks || []).flat();

  console.log(cocktails);
  return cocktails;
};