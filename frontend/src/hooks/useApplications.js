// useApplications.js

import { useState, useEffect } from 'react';
import { getApplications, deleteApplication as deleteAppAPI } from '../services/api';

export const useApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (appId) => {
    try {
      await deleteAppAPI(appId);
      setApplications(prev => prev.filter(app => app.id !== appId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const addApplication = (newApp) => {
    setApplications(prev => [newApp, ...prev]);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return { 
    applications, 
    loading, 
    error, 
    fetchApplications,
    deleteApplication,
    addApplication
  };
};