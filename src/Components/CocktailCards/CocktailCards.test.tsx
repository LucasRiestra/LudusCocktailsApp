import { render, screen } from '@testing-library/react';
import { CocktailList, CocktailCard } from './CocktailCards';
import React = require('react');

test('renders CocktailCard with correct props', () => {
  const cocktailCardProps = {
    name: 'Test Cocktail',
    image: 'test-image.jpg',
    category: 'Test Category',
    ingredients: ['ingredient1', 'ingredient2'],
    measures: ['1 oz', '2 oz'],
    instructions: 'Test instructions',
    strAlcoholic: 'Non_Alcoholic'
  };

  render(<CocktailCard {...cocktailCardProps} />);

  (expect(screen.getByText ('Test Cocktail'))as any).toBeInTheDocument();
  (expect(screen.getByText('Test Category'))as any).toBeInTheDocument();
  (expect(screen.getByText('ingredient1 - 1 oz'))as any).toBeInTheDocument();
  (expect(screen.getByText('ingredient2 - 2 oz'))as any).toBeInTheDocument();
  (expect(screen.getByText('Test instructions'))as any).toBeInTheDocument();
  (expect(screen.getByText('Non_Alcoholic'))as any).toBeInTheDocument();
});

test('renders CocktailList with correct props', () => {
  const cocktails = [
    {
      idDrink: '1',
      strDrink: 'Test Cocktail 1',
      strDrinkThumb: 'test-image1.jpg',
      strCategory: 'Test Category 1',
      strIngredient1: 'ingredient1',
      strIngredient2: 'ingredient2',
      strMeasure1: '1 oz',
      strMeasure2: '2 oz',
      strInstructions: 'Test instructions 1',
      strAlcoholic: 'Non_Alcoholic'
    },
    {
      idDrink: '2',
      strDrink: 'Test Cocktail 2',
      strDrinkThumb: 'test-image2.jpg',
      strCategory: 'Test Category 2',
      strIngredient1: 'ingredient3',
      strIngredient2: 'ingredient4',
      strMeasure1: '3 oz',
      strMeasure2: '4 oz',
      strInstructions: 'Test instructions 2',
      strAlcoholic: 'Alcoholic'
    }
  ];

  const gridRef = React.createRef<HTMLDivElement>();

  render(<CocktailList cocktails={cocktails} currentPage={1} setCurrentPage={() => { } } gridRef={gridRef} />);

  (expect(screen.getByText('Test Cocktail 1'))as any).toBeInTheDocument();
  (expect(screen.getByText('Test Cocktail 2'))as any).toBeInTheDocument();
});