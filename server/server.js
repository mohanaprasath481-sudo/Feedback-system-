
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error))

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  q1: { type: String, required: true },
  q2: { type: String, required: true },
  q3: { type: String, required: true },
  q4: { type: String, required: true },
  q5: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
})

const Feedback = mongoose.model('Feedback', feedbackSchema)

// POST API - Save feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const { q1, q2, q3, q4, q5 } = req.body

    const feedback = new Feedback({
      q1, q2, q3, q4, q5
    })

    await feedback.save()

    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error submitting feedback',
      error: error.message
    })
  }
})

// GET API - Retrieve all feedback
app.get('/api/getfeedback', async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ submittedAt: -1 })
    res.status(200).json(feedback)
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving feedback',
      error: error.message
    })
  }
})

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
