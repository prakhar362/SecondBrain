import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContentCard from '../components/ContentCard';
import { URL } from '@/utils/url';

const Home = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${URL}/content`, {
        headers: {
          'Authorization': token
        }
      });
      setContents(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching contents:', err);
      setError('Failed to fetch contents');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContent = (contentId) => {
    setContents(prevContents => prevContents.filter(content => content._id !== contentId));
  };

  useEffect(() => {
    fetchContents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((content) => (
          <ContentCard 
            key={content._id} 
            content={content} 
            onDelete={handleDeleteContent}
          />
        ))}
      </div>
    </div>
  );
};

export default Home; 