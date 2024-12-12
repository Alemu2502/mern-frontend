import { API } from '../config';
import queryString from 'query-string';

const handleResponse = async (response) => {
  if (response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("Received non-JSON response");
    }
  } else {
     await response.text();
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${API}/categories`, { method: "GET" });
    return await handleResponse(response);
  } catch (err) {}
};

export const getProducts = async (sortBy) => {
  try {
    const response = await fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, { method: "GET" });
    return await handleResponse(response);
  } catch (err) {}
};

export const hasDelivered = async (productId, userId, token) => {
  try {
    const response = await fetch(`${API}/delivered/${productId}/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (response.ok) {
      return response.json();
    }
  } catch (err) {}
};

const fetchWithToken = async (url, options, token) => {
  if (!token) return;
  const authHeader = { Authorization: `Bearer ${token}` };
  options.headers = { ...options.headers, ...authHeader };

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    const errorMessage = error.error || 'Unknown error';
    throw new Error(errorMessage);
  }

  return response.json();
};

export const getUserReview = async (productId, userId, token) => {
  try {
    const response = await fetchWithToken(`${API}/review/${productId}/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }, token);
    return response;
  } catch (err) {}
};

export const getBraintreeClientToken = async (userId, token) => {
  try {
    const response = await fetchWithToken(
      `${API}/braintree/getToken/${userId}`, 
      { method: "GET", headers: { Accept: "application/json", "Content-Type": "application/json" } }, 
      token
    );
    return response;
  } catch (err) {}
};

export const processPayment = async (userId, token, paymentData) => {
  try {
    const response = await fetchWithToken(
      `${API}/braintree/payment/${userId}`, 
      { 
        method: "POST", 
        headers: { Accept: "application/json", "Content-Type": "application/json" }, 
        body: JSON.stringify(paymentData) 
      }, 
      token
    );
    return response;
  } catch (err) {}
};

export const updateReview = async (reviewId, review, token, userId) => {
  try {
    const response = await fetch(`${API}/review/${reviewId}/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(review)
    });

    const data = await response.json();
    return data;
  } catch (err) {}
};

export const deleteReview = async (reviewId, productId, userId, token) => {
  try {
    const response = await fetchWithToken(`${API}/review/${reviewId}/${productId}/${userId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json'
      }
    }, token);
    return response;
  } catch (err) {}
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
    return await response;
  } catch (err) {}
};

export const getReviews = async (productId) => {
  try {
    const response = await fetch(`${API}/reviews/${productId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    return await handleResponse(response);
  } catch (err) {}
};

export const getProductReviews = async (productId) => {
  try {
    const response = await fetch(`${API}/reviews/${productId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      const errorMessage = error.error || 'Unknown error';
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {}
};

export const getFilteredProducts = async (skip, limit, filters = {}) => {
  const data = { limit, skip, filters };
  try {
    const response = await fetch(`${API}/products/by/search`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await handleResponse(response);
  } catch (err) {}
};

export const list = async (params) => {
  const query = queryString.stringify(params);
  try {
    const response = await fetch(`${API}/products/search?${query}`, {
      method: "GET"
    });
    return await handleResponse(response);
  } catch (err) {}
};

export const read = async (productId) => { 
  try { 
    const response = await fetch(`${API}/product/${productId}`, { method: 'GET' }); 
    return await handleResponse(response); 
  } catch (err) {} 
};

export const listRelated = async (productId) => {
  try {
    const response = await fetch(`${API}/products/related/${productId}`, {
      method: "GET"
    });
    return await handleResponse(response);
  } catch (err) {}
};

export const createOrder = async (userId, token, createOrderData) => {
  try {
    const response = await fetchWithToken(`${API}/order/create/${userId}`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ order: createOrderData })
    }, token);
    return await handleResponse(response);
  } catch (err) {}
};

export const getProduct = async (productId) => {
  try {
    const response = await fetch(`${API}/product/${productId}`, {
      method: 'GET'
    });
    return await handleResponse(response);
  } catch (err) {}
};
