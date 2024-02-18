import React, { useState } from 'react';
import { CocktailCardProps, CocktailListProps, } from '../../Types/CocktailCardsProps';
import './CocktailCards.css';
import Pagination from '../Pagination/Pagination';

export const CocktailList: React.FC<CocktailListProps> = ({ cocktails, gridRef }) => {
  const [page, setPage] = useState(1);
  const cocktailsPerPage = 6;
  const totalPages = Math.ceil(cocktails.length / cocktailsPerPage);

  return (
    <div>
    <div className='cocktail-grid' ref={gridRef}>
      {cocktails.slice((page - 1) * cocktailsPerPage, page * cocktailsPerPage).map(cocktail => {
        const cocktailCardProps: CocktailCardProps = {
          name: cocktail.strDrink,
          image: cocktail.strDrinkThumb,
          category: cocktail.strCategory,
          ingredients: Array.from({length: 6}, (_, i) => cocktail[`strIngredient${i+1}`]).filter(Boolean),
          measures: Array.from({length: 6}, (_, i) => cocktail[`strMeasure${i+1}`]).filter(Boolean),
          instructions: cocktail.strInstructions,
          strAlcoholic: cocktail.strAlcoholic
        };

        return <CocktailCard key={cocktail.idDrink} {...cocktailCardProps} />
      })}
      </div>
      {cocktails.length > 0 && <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} gridRef={gridRef} />}
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