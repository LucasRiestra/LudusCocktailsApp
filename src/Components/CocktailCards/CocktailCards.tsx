import { useState, useEffect } from 'react';
import { CocktailCardProps, CocktailListProps } from '../../Types/CocktailCardsProps';
import './CocktailCards.css';
import Pagination from '../Pagination/Pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const CocktailList: React.FC<CocktailListProps> = ({ cocktails, popularCocktails, gridRef, currentPage, setCurrentPage }) => {
  const [displayCocktails, setDisplayCocktails] = useState(popularCocktails);
  const cocktailsPerPage = 6;
  const totalPages = Math.ceil(displayCocktails.length / cocktailsPerPage);

  useEffect(() => {
    setDisplayCocktails(cocktails.length > 0 ? cocktails : popularCocktails);
  }, [cocktails, popularCocktails]);

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out',
      once: false,
    });

    return () => {};
  }, []);

  return (
    <div>
      {displayCocktails.length > 0 && (
        <div>
          <div className='cocktail-grid' ref={gridRef}>
            {displayCocktails.slice((currentPage - 1) * cocktailsPerPage, currentPage * cocktailsPerPage).map((cocktail: any, index: number) => {
              if (cocktail.strDrink && cocktail.strDrinkThumb && cocktail.strCategory && cocktail.strInstructions && cocktail.strAlcoholic) {
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
              }
            })}
          </div>
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} gridRef={gridRef} />
        </div>
      )}
    </div>
  );
}

export const CocktailCard: React.FC<CocktailCardProps> = ({ name, image, category, ingredients, measures, instructions, strAlcoholic }) => {
    return (
      <div className='card' data-aos="fade-right">
        <h2 className='card-name'>{name}</h2>
        <img src={image} alt={name} className='img'/>
        <p className='card-category'>{category}</p>
        <p>{strAlcoholic}</p>
        <h5>Ingredients</h5>
        <ul className='card-ingredients'>
          {ingredients.map((ingredient: string, index: number) => (
            <li key={index}>{ingredient} - {measures[index]}</li>
          ))}
        </ul>
        <h5>Instructions</h5>
        <p className='card-preparations'>{instructions}</p>
      </div>
    );
}