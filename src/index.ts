import express from 'express';
import { createConnection } from 'typeorm';
import cors from 'cors'; // import CORS
import authController from './controllers/AuthController'; // make sure the path is correct
import { authMiddleware } from './middleware/authMiddleware';

// Establish connection to the database
createConnection().then(async connection => {
  console.log('Connected to the database successfully.');

  // Initialize the express app
  const app = express();

  // Use CORS middleware to enable cross-origin requests
  // For development you might allow all origins, but for production, specify your front-end's origin
  app.use(cors());

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Use your auth routes
  app.use('/auth', authController);

  // A secure route example
  app.get('/secure-route', authMiddleware, (req, res) => {
    res.send('This route is secured and accessible only for authenticated users.');
  });

  // A simple test route
  app.get('/', (req, res) => {
    res.send('Hello, this is the API!');
  });

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

}).catch(error => {
  console.error('Error connecting to the database', error);
});
