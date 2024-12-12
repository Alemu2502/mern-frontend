import { API } from '../config';

export const createCategory = async (userId, token, category) => {
    try {
        const response = await fetch(`${API}/category/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        });
        return await response.json();
    } catch (error) {
        
    }
};

export const updateCategory = async (categoryId, userId, token, category) => {
    try {
        const response = await fetch(`${API}/category/${categoryId}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        });
        return await response.json();
    } catch (error) {
        
    }
};

export const createProduct = async (userId, token, product) => {
    try {
        const response = await fetch(`${API}/product/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: product
        });
        return await response.json();
    } catch (error) {
       
    }
};

export const getCategory = async (categoryId) => {
    try {
        const response = await fetch(`${API}/category/${categoryId}`, {
            method: 'GET'
        });
        return await response.json();
    } catch (error) {

    }
};


// Fetch all categories
export const getCategories = async () => {
    try {
        const response = await fetch(`${API}/categories`, {
            method: "GET"
        });
        return await response.json();
    } catch (err) {

    }
};

// Delete a category

// Delete a category
export const deleteCategory = async (categoryId, userId, token) => {
    try {
        const response = await fetch(`${API}/category/${categoryId}/${userId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) {
       
    }
};


export const listOrders = async (userId, token) => {
    try {
        const response = await fetch(`${API}/order/list/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        
    }
};

export const getStatusValues = async (userId, token) => {
    try {
        const response = await fetch(`${API}/order/status-values/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {

    }
};

export const updateOrderStatus = async (userId, token, orderId, status) => {
    try {
        const response = await fetch(`${API}/order/${orderId}/status/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status, orderId })
        });
        return await response.json();
    } catch (error) {

    }
};

export const getProducts = async () => {
    try {
        const response = await fetch(`${API}/products?limit=undefined`, {
            method: 'GET'
        });
        return await response.json();
    } catch (error) {
        
    }
};


export const deleteProduct = async (productId, userId, token) => {
    try {
        console.log(`DELETE request to ${API}/product/${productId}/${userId}`);
        const response = await fetch(`${API}/product/${productId}/${userId}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'An error occurred while deleting the product.');
        }

        return responseData;
    } catch (error) {
    
    }
};


export const getProduct = async (productId) => {
    try {
        const response = await fetch(`${API}/product/${productId}`, {
            method: 'GET'
        });
        return await response.json();
    } catch (error) {
        
    }
};

export const updateProduct = async (productId, userId, token, product) => {
    try {
        const response = await fetch(`${API}/product/${productId}/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: product
        });
        return await response.json();
    } catch (error) {
        
    }
};
