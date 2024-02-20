import "../../Types/CategoriesFilterProps"
import "./CategoriesFilter.css"

export const cocktailCategories = ["Cocktail", "Shot", "Ordinary Drink", "Other / Unknown", "Coffee / Tea", "Beer", "Punch / Party Drink", "Shake", "Soft Drink", "Homemade Liqueur", "Cocoa"];

const CategoriesFilter: React.FC<CategoriesFilterProps> = ({ onCategoryChange, selectedCategory }) => {
    return (
    <div className='filter-container'>
      <select className="form-select" aria-label="Default select example" onChange={(e) => onCategoryChange(e.target.value)} value={selectedCategory}>
        <option value="Select Category">Select Category</option>
        {cocktailCategories.map(category => <option key={category} value={category}>{category}</option>)}
      </select>
      </div>
    );
  };

export default CategoriesFilter;