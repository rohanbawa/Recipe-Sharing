import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './authContext';


interface RecipeCardProps {
  recipe: {
    recipe_id: number;
    title: string;
    Instruction:string;
    description: string;
    ingredients: string[];
    image: string;
    created_at: string;
  };
}

interface Comment {
  comment_id: number;
  comment_text: string;
  username:string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/recipes/${recipe.recipe_id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      await axios.post(`/api/recipes/${recipe.recipe_id}/comments/create`, {
        comment_text: commentText,
        user_id: user?.user_id,
        username: user?.username
        , // Replace with the actual user ID
      });
      setCommentText('');
      fetchComments(); // Fetch updated comments after submitting
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="recipeCard">
      <div className="recipeImage">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className="recipeContent">
        <div className="title">
          <h3 className="font-bold text-xl mb-2">{recipe.title}</h3>
          <p className="text-gray-700 text-base mb-4">{recipe.description}</p>
          <div className="font-bold text-xl mb-2">Instructions <br></br>
          <p className="text-gray-700 text-base mb-4" >{recipe.Instruction}</p>          
          </div>
          <div className="text-gray-700">
            <strong>Ingredients:</strong> {recipe.ingredients.map((ele,idx)=>(<div key={idx}>{ele}<br></br></div>))}
          </div>
        </div>
        <div className="comments">
          <h4 className="font-bold text-lg mb-2">Comments</h4>
          <ul>
            {comments.map(comment => (
              <li key={comment.comment_id}><b>{comment.username} </b>: {comment.comment_text}</li>
            ))}
          </ul>
        </div>
        <div className="commentInput">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Submit</button>
        </div>
        <p className="text-right text-gray-700">
            {recipe.created_at.slice(0,10)}
          </p>
      </div>
    </div>
  );
};

export default RecipeCard;
