const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const Review = require("./model/Review");
const { postReview } = require("./controller/postReview");
const path = require('path');
const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Serve frontend static files only in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// API routes under /api
const apiRouter = express.Router();
apiRouter.post('/submit', postReview);
apiRouter.get('/overall-average', async (req, res) => {
  try {
    let result = await Review.aggregate([
      { $group: { _id: null, average: { $avg: "$average" } } },
    ]);
    const overallAverage = result.length > 0 ? result[0].average : 0;
    res.json({ overallAverage });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch overall average.' });
  }
});
apiRouter.get('/check-rated', async (req, res) => {
  const user_rating_id = req.query.user_rating_id;
  if (!user_rating_id) {
    return res.status(400).json({ hasRated: false });
  }

  try {
    const review = await Review.findOne({ user_rating_id });
    res.json({ hasRated: !!review  , ratings: review.average , que: review.ratings});
  } catch (err) {
    res.status(500).json({ hasRated: false });
  }
});
app.use('/api', apiRouter);

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
