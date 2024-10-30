const API_URL = 'http://localhost:5001/api';

export const fetchGreeting = async () => {
    const response = await fetch(API_URL);
    return response.text();
  };
  