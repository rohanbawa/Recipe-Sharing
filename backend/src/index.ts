const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secretKey = 'FinalProject@1234';
const app = express();
const port = 3000;


// Create connection to MySQL database
const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '1234',
  database : 'finalproject',
  dataStrings : true,
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

const corsOptions ={
  origin: 'http://localhost:5173', // Allow requests only from this origin
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

// app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:5173' // Allow requests only from this origin
// }));




function generateToken(user) {
  const payload = {
    userId: user.user_id,
    username: user.username,
    email: user.email
    // You can add more user data to the payload as needed
  };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
}

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized: No token provided');
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized: Invalid token');
    }
    req.userId = decoded.userId; // Attach user ID to request object for further processing
    next();
  });
}


// Middleware to parse JSON body
app.use(bodyParser.json());

// User Management
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send('All fields are required');
    }
    const query = 'INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)';
    connection.query(query, [username, email, password], (err, results) => {
      if (err) {
        console.error('Error registering user: ', err);
        return res.status(500).send('Error registering user');
      }
      res.status(201).send('User registered successfully');
    });
  });
  


  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
    const query = 'SELECT * FROM users WHERE email = ? AND password_hash = ?';
    connection.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Error logging in: ', err);
        return res.status(500).send('Error logging in');
      }
      if (results.length === 0) {
        return res.status(401).send('Invalid email or password');
      }
      // User authentication successful, generate JWT token
      const user = results[0];
      const token = generateToken(user);
      res.status(200).json({ token });
    });
  });


app.post('/api/logout', (req, res) => {
  // Implementation for user logout
});

// Recipe Management
app.get('/api/recipes', (req, res) => {
  // Implementation to retrieve all recipes
  const query = 'SELECT * FROM recipes';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving recipes: ', err);
      return res.status(500).send('Error retrieving recipes');
    }
    res.status(200).json(results);
  });
});

app.get('/api/recipes/:id', (req, res) => {
  // Implementation to retrieve a specific recipe by ID
  const recipeId = req.params.id;
  const query = 'SELECT * FROM recipes WHERE recipe_id = ?';
  connection.query(query, [recipeId], (err, results) => {
    if (err) {
      console.error('Error retrieving recipe: ', err);
      return res.status(500).send('Error retrieving recipe');
    }
    if (results.length === 0) {
      return res.status(404).send('Recipe not found');
    }
    res.status(200).json(results[0]);
  });
});


app.post('/api/recipes/create', (req, res) => {
  // Implementation to create a new recipe
  const { title, description, ingredients, instructions, userId } = req.body;
  const query = 'INSERT INTO recipes (title, description, ingredients, instructions, user_id) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [title, description, ingredients, instructions, userId], (err, results) => {
    if (err) {
      console.error('Error creating recipe: ', err);
      return res.status(500).send('Error creating recipe');
    }
    res.status(201).send('Recipe created successfully');
  });
});

app.put('/api/recipes/update/:id/', (req, res) => {
  const recipeId = req.params.id;
  const { ingredients, instructions } = req.body;
  const query = 'UPDATE recipes SET ingredients = ?, instructions = ? WHERE recipe_id = ?';
  connection.query(query, [ingredients, instructions, recipeId], (err, results) => {
    if (err) {
      console.error('Error updating recipe: ', err);
      return res.status(500).send('Error updating recipe');
    }
    res.status(200).send('Recipe updated successfully');
  });
});

app.delete('/api/recipes/delete/:id/', (req, res) => {
  const recipeId = req.params.id;
  const query = 'DELETE FROM recipes WHERE recipe_id = ?';
  connection.query(query, [recipeId], (err, results) => {
    if (err) {
      console.error('Error deleting recipe: ', err);
      return res.status(500).send('Error deleting recipe');
    }
    res.status(200).send('Recipe deleted successfully');
  });
});
// Comments Management
app.get('/api/recipes/:id/comments', (req, res) => {
  const recipeId = req.params.id;
  const query = 'SELECT * FROM Comments WHERE recipe_id = ?';
  connection.query(query, [recipeId], (err, results) => {
    if (err) {
      console.error('Error retrieving comments: ', err);
      return res.status(500).send('Error retrieving comments');
    }
    res.status(200).json(results);
  });
});


app.post('/api/recipes/:id/comments/create', (req, res) => {
  const { comment_text, user_id } = req.body;
  const recipeId = req.params.id;
  const query = 'INSERT INTO Comments (comment_text, user_id, recipe_id) VALUES (?, ?, ?)';
  connection.query(query, [comment_text, user_id, recipeId], (err, results) => {
    if (err) {
      console.error('Error adding comment: ', err);
      return res.status(500).send('Error adding comment');
    }
    res.status(201).send('Comment added successfully');
  });
});


app.post('/api/recipes/:id/rate', (req, res) => {
  const recipeId = req.params.id;
  const { rating } = req.body;

  // Assuming you have a table named 'ratings' to store ratings for each recipe
  const query = 'INSERT INTO ratings (recipe_id, rating) VALUES (?, ?)';
  connection.query(query, [recipeId, rating], (err, results) => {
    if (err) {
      console.error('Error rating recipe: ', err);
      return res.status(500).send('Error rating recipe');
    }
    res.status(201).send('Rating added successfully');
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
