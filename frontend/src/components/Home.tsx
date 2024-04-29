import React, { useState, useEffect } from 'react';
import RecipeCard from './receipeCard'; // Import the RecipeCard component

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  rating: number;
  image: string;
}

const Home = () => {
  // Specify the type of the recipes state
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    // Example: Fetch recipe data from backend API
    const mockRecipes: Recipe[] = [
      {
        id: 1,
        title: 'Pasta Carbonara',
        description: 'Classic Italian pasta dish with bacon, eggs, and cheese.',
        ingredients: ['Spaghetti', 'Bacon', 'Eggs', 'Parmesan cheese'],
        instructions: 'Cook spaghetti until al dente. Fry bacon until crispy. Mix eggs and Parmesan cheese. Toss spaghetti with egg mixture and bacon. Serve hot.',
        rating: 4.5,
        image: 'https://example.com/pasta.jpg'
      },
      // Add more recipes as needed
    ];

    setRecipes(mockRecipes);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
