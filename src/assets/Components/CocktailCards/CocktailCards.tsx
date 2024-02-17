import React from 'react';
import { CocktailCardProps } from '../../Types/CocktailCardsProps';

export const CocktailCard: React.FC<CocktailCardProps> = ({ name, image, category, ingredients, measures, instructions, strAlcoholic }) => {
    return (
      <div>
        <h2>{name}</h2>
        <img src={image} alt={name} />
        <p>{category}</p>
        <p>{strAlcoholic}</p>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient} - {measures[index]}</li>
          ))}
        </ul>
        <p>{instructions}</p>
      </div>
    );
}

interface CocktailListProps {
  cocktails: any[];
}

export const CocktailList: React.FC<CocktailListProps> = ({ cocktails }) => {
  return (
    <>
      {cocktails.map(cocktail => {
        const cocktailCardProps: CocktailCardProps = {
          name: cocktail.strDrink,
          image: cocktail.strDrinkThumb,
          category: cocktail.strCategory,
          ingredients: Array.from({length: 15}, (_, i) => cocktail[`strIngredient${i+1}`]).filter(Boolean),
          measures: Array.from({length: 15}, (_, i) => cocktail[`strMeasure${i+1}`]).filter(Boolean),
          instructions: cocktail.strInstructions,
          strAlcoholic: cocktail.strAlcoholic
        };

        return <CocktailCard key={cocktail.idDrink} {...cocktailCardProps} />
      })}
    </>
  );
}