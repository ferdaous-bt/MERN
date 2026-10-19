const express = require('express');
const articleRoutes = require('./routes/articleRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// Load environment variables (.env)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes);

(async () => {
  try {
    // 1. Establish the MongoDB connection
    await connectDB(process.env.MONGODB_URI);

    // 2. Start the HTTP server after the database connection
    app.listen(PORT, () => {
      console.log(`MERN server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Critical server startup error:', err.message);
    process.exit(1);
  }
})();
