import { API } from '../config';

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = 'Unknown error';
    try {
      errorMessage = await response.text();
    } catch (err) {
      // Error parsing response text
    }
    throw new Error('Network response was not ok');
  }

  try {
    return await response.json();
  } catch (err) {
    throw new Error('Failed to parse JSON response');
  }
};

const fetchWithToken = async (url, options, token) => {
  if (!token) {
    throw new Error('No token available');
  }
  const authHeader = { Authorization: `Bearer ${token}` };
  options.headers = { ...options.headers, ...authHeader };
  const response = await fetch(url, options);
  return await handleResponse(response);
};

export const addReview = async (productId, userId, review, token) => {
  try {
    const response = await fetchWithToken(`${API}/review/${productId}/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review)
    }, token);
    return await handleResponse(response);
  } catch (err) {
    return { error: err.message };
  }
};
