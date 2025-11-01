import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function MissionSubmission() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mission, setMission] = useState(null);
  const [submission, setSubmission] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMission();
  }, [id]);

  const fetchMission = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/missions/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setMission(data.mission);
      } else {
        alert('Mission not found');
        navigate('/home');
      }
    } catch (error) {
      console.error('Error fetching mission:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!submission.trim()) {
      alert('Please provide your submission details');
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/missions/${id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          submission: submission,
          fileUrl: fileUrl
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ Mission submitted successfully! Waiting for teacher approval.');
        navigate('/profile');
      } else {
        alert('❌ ' + data.message);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('⚠️ Failed to submit mission');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh' 
      }}>
        <div className="loading">Loading mission...</div>
      </div>
    );
  }

  if (!mission) {
    return <div>Mission not found</div>;
  }

  return (
    <section className="container" style={{ paddingTop: '2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >
        <h1>🎯 Submit Mission</h1>
        
        {/* Mission Details */}
        <div style={{ 
          background: 'rgba(255,255,255,0.05)', 
          padding: '1.5rem', 
          borderRadius: '10px',
          marginBottom: '2rem'
        }}>
          <h2 style={{ marginTop: 0, color: 'var(--accent2)' }}>{mission.title}</h2>
          <p><strong>Description:</strong> {mission.description}</p>
          <p><strong>Instructions:</strong> {mission.instructions}</p>
          <p><strong>Points:</strong> <span style={{ color: 'var(--accent1)' }}>{mission.points} XP</span></p>
          <p><strong>Difficulty:</strong> <span style={{ textTransform: 'capitalize' }}>{mission.difficulty}</span></p>
          <p><strong>Category:</strong> <span style={{ textTransform: 'capitalize' }}>{mission.category}</span></p>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Your Submission Details *
            </label>
            <textarea
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
              placeholder="Describe how you completed the mission, provide details, links, or any proof..."
              rows="6"
              required
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: 'white',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              File URL (Optional)
            </label>
            <input
              type="url"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="https://drive.google.com/your-file-link or image URL"
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: 'white',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn"
              style={{ background: 'gray' }}
              onClick={() => navigate('/home')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn"
              disabled={submitting}
              style={{ 
                background: 'var(--accent2)',
                opacity: submitting ? 0.7 : 1
              }}
            >
              {submitting ? 'Submitting...' : '🚀 Submit Mission'}
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}