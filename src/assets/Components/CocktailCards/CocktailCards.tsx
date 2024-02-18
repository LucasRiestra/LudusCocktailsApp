import React from 'react';
import { CocktailCardProps, CocktailListProps, } from '../../Types/CocktailCardsProps';
import './CocktailCards.css';

export const CocktailList: React.FC<CocktailListProps> = ({ cocktails }) => {
  return (
    <>
      {cocktails.map(cocktail => {
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
    </>
  );
}

export const CocktailCard: React.FC<CocktailCardProps> = ({ name, image, category, ingredients, measures, instructions, strAlcoholic }) => {
    return (
      <div>
        <h2 className='card-name'>{name}</h2>
        <img src={image} alt={name} className='img'/>
        <p className='card-category'>{category}</p>
        <p>{strAlcoholic}</p>
        <ul className='card-ingredients'>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient} - {measures[index]}</li>
          ))}
        </ul>
        <p className='card-preparations'>{instructions}</p>
      </div>
    );
}