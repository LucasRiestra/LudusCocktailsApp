export interface CocktailCardProps {
  name: string;
  image: string;
  category: string;
  ingredients: string[];
  measures: string[];
  instructions: string;
  strAlcoholic: string;
}

export interface CocktailListProps {
  cocktails: any[];
  popularCocktails: any[]; 
  gridRef: React.RefObject<HTMLDivElement>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}