
import { useEffect, useState } from 'react'
import axios from 'axios'
import './GetAllData.css'

function GetAllDAta() {
  const [feedbackList, setFeedbackList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          '/api/getfeedback'
        )
        setFeedbackList(response.data)
      } catch (error) {
        console.error('Error fetching feedback:', error)
        alert('Unable to load feedback')
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [])

  if (loading) {
    return <h2>Loading feedback...</h2>
  }

  return (
    <div className="feedback-container">
      <h1>All Submitted Feedback</h1>

      {feedbackList.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        feedbackList.map((feedback) => (
          <div className="feedback-card" key={feedback._id}>
            <h3>{feedback.q1}</h3>
            <p><strong>Department:</strong> {feedback.q2}</p>
            <p><strong>Session:</strong> {feedback.q3}</p>
            <p><strong>Feedback:</strong> {feedback.q4}</p>
            <p><strong>Suggestions:</strong> {feedback.q5}</p>
            <small>
              Submitted: {new Date(feedback.submittedAt).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  )
}

export default GetAllDAta
