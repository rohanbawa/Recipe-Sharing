
const RecipeCard = ({ recipe }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={recipe.image} alt={recipe.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{recipe.title}</div>
        <p className="text-gray-700 text-base">{recipe.description}</p>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">
          <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Instructions:</strong> {recipe.instructions}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Rating:</strong> {recipe.rating}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
