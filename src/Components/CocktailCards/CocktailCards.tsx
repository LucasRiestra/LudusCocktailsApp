import { useState, useEffect } from 'react';
import { CocktailCardProps, CocktailListProps, } from '../../Types/CocktailCardsProps';
import './CocktailCards.css';
import Pagination from '../Pagination/Pagination';

export const CocktailList: React.FC<CocktailListProps> = ({ cocktails, popularCocktails, gridRef, currentPage, setCurrentPage }) => {
  const [displayCocktails, setDisplayCocktails] = useState(popularCocktails);
  const [showPopular, setShowPopular] = useState(true);
  const cocktailsPerPage = 6;
  const totalPages = Math.ceil(displayCocktails.length / cocktailsPerPage);

  useEffect(() => {
    if (cocktails.length > 0) {
      setDisplayCocktails(cocktails);
      setShowPopular(true);
      
    } else {
      setDisplayCocktails(popularCocktails);
      setShowPopular(false);
    }
  }, [cocktails, popularCocktails]);

  return (
    <div>
      {showPopular && <h2 className='popular'>See the most popular cocktails</h2>}
      <div className='cocktail-grid' ref={gridRef}>
        {displayCocktails.slice((currentPage - 1) * cocktailsPerPage, currentPage * cocktailsPerPage).map((cocktail, index) => {
          const cocktailCardProps: CocktailCardProps = {
            name: cocktail.strDrink,
            image: cocktail.strDrinkThumb,
            category: cocktail.strCategory,
            ingredients: Array.from({length: 6}, (_, i) => cocktail[`strIngredient${i+1}`]).filter(Boolean),
            measures: Array.from({length: 6}, (_, i) => cocktail[`strMeasure${i+1}`]).filter(Boolean),
            instructions: cocktail.strInstructions,
            strAlcoholic: cocktail.strAlcoholic
          };

          return <CocktailCard key={`${cocktail.idDrink}-${index}`} {...cocktailCardProps } />
        })}
      </div>
      {displayCocktails.length > 0 && <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} gridRef={gridRef} />}
    </div>
  );
}

export const CocktailCard: React.FC<CocktailCardProps> = ({ name, image, category, ingredients, measures, instructions, strAlcoholic }) => {
    return (
      <div className='card'>
        <h2 className='card-name'>{name}</h2>
        <img src={image} alt={name} className='img'/>
        <p className='card-category'>{category}</p>
        <p>{strAlcoholic}</p>
        <h5>Ingredients</h5>
        <ul className='card-ingredients'>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient} - {measures[index]}</li>
          ))}
        </ul>
        <h5>Preparation</h5>
        <p className='card-preparations'>{instructions}</p>
      </div>
    );
}