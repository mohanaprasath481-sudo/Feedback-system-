
import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post(
        'https://feedbackform-ena7.onrender.com/api/feedback',
        formData
      )

      alert('Feedback submitted successfully!')

      setFormData({
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: ''
      })
    } catch (error) {
      console.error('Submission error:', error)
      alert(
        error.response?.data?.message ||
        'Unable to submit feedback. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Online Feedback Form</h1>
      <p>Please answer all five questions.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="q1">1. Name</label>
        <input
          type="text"
          id="q1"
          name="q1"
          value={formData.q1}
          onChange={handleChange}
          required
        />

        <label htmlFor="q2">2. Department</label>
        <input
          type="text"
          id="q2"
          name="q2"
          value={formData.q2}
          onChange={handleChange}
          required
        />

        <label htmlFor="q3">3. Session Title</label>
        <input
          type="text"
          id="q3"
          name="q3"
          value={formData.q3}
          onChange={handleChange}
          required
        />

        <label htmlFor="q4">4. Feedback</label>
        <textarea
          id="q4"
          name="q4"
          value={formData.q4}
          onChange={handleChange}
          required
        />

        <label htmlFor="q5">5. Suggestions</label>
        <textarea
          id="q5"
          name="q5"
          value={formData.q5}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  )
}

export default App
