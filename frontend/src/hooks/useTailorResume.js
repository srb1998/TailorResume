// File: frontend/src/hooks/useTailorResume.js
import { useState } from 'react';
import { tailorResume as tailorResumeAPI } from '../services/api';

export const useTailorResume = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tailor = async (jobDescription, jobUrl = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await tailorResumeAPI(jobDescription, jobUrl);
      return result;
    } catch (err) {
      const message = err.response?.data?.detail || err.message || 'Failed to tailor resume';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { tailor, loading, error };
};