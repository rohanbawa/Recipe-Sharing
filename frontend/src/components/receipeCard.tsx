import React from 'react';

interface RecipeCardProps {
  recipe: {
    id: number;
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
    rating: number;
    image: string;
  };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="recipeCard">
      <div className="recipeImage">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className="recipeContent">
        <div className="title">
          <h3 className="font-bold text-xl mb-2">{recipe.title}</h3>
          <p className="text-gray-700 text-base">{recipe.description}</p>
        </div>
        <div className="details">
          <h4 className="font-bold text-lg mb-2">Details</h4>
          <p>
            <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
          </p>
          <p>
            <strong>Instructions:</strong> {recipe.instructions}
          </p>
          <p>
            <strong>Rating:</strong> {recipe.rating}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;