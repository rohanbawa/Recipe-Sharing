import React, { useState } from 'react';

const AddRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    ingredients: [{ item: '', quantity: '' }],
    image: null,
    video: null
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setRecipeData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[index][field] = value;
    setRecipeData(prevState => ({
      ...prevState,
      ingredients: newIngredients
    }));
  };


const handleAddMoreIngredients = () => {
  setRecipeData(prevState => ({
    ...prevState,
    ingredients: [...prevState.ingredients, { item: '', quantity: '' }]
  }));
};

  const handleImageChange = (e:any) => {
    setRecipeData(prevState => ({
      ...prevState,
      image: e.target.files[0]
    }));
  };

  const handleVideoChange = (e:any) => {
    setRecipeData(prevState => ({
      ...prevState,
      video: e.target.files[0]
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Add your logic to submit recipe data
    console.log(recipeData);
  };

  return (
    <div className="home-container">
      <div className="home-background"></div>
    <div className="container mx-auto px-4 py-8">
    <div className="centered-container">
    <div className="recipes-box">
      <h2 className="text-3xl font-semibold mb-4">Add Recipe</h2></div></div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title:</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            name="title"
            type="text"
            placeholder="Enter title"
            value={recipeData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            placeholder="Enter description"
            value={recipeData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredients">Ingredients:</label>
          {recipeData.ingredients.map((ingredient, index) => (
  <div key={index} className="mb-2">
    <input
      className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      placeholder={`Ingredient ${index + 1}`}
      value={ingredient.item}
      onChange={(e) => handleIngredientChange(index, 'item', e.target.value)}
      required
    />
    <input
      className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      placeholder={`Quantity ${index + 1}`}
      value={ingredient.quantity}
      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
      required
    />
  </div>
))}
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddMoreIngredients}
          >
            Add More
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image:</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="video">Video:</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="video"
            name="video"
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
          />
        </div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddRecipe;
