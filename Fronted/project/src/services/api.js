// Base URL for ASP.NET Core Web API
export const API_BASE_URL = 'https://localhost:7125/api';

// ==========================================
// LOCAL STORAGE TOKEN HELPERS
// ==========================================
export const getToken = () => localStorage.getItem('token');

export const setToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Error parsing stored user:', e);
    return null;
  }
};

export const setStoredUser = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

export const clearAuthStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// ==========================================
// AUTHENTICATED FETCH WRAPPER
// Automatically attaches JWT Bearer token from localStorage
// ==========================================
export async function authFetch(url, options = {}) {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  // Handle unauthorized (expired or invalid token)
  if (response.status === 401) {
    console.warn('Unauthorized request (401). Token might be expired.');
    // Optional: trigger event or let caller handle
  }

  return response;
}

// ==========================================
// AUTH API CALLS
// ==========================================
export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/Users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    let errorMsg = 'Invalid email or password';
    try {
      const errData = await response.json();
      errorMsg = errData.message || errData.title || errorMsg;
    } catch {
      const text = await response.text();
      if (text) errorMsg = text;
    }
    throw new Error(errorMsg);
  }

  const data = await response.json();
  return data;
}

export async function getCurrentUser() {
  const response = await authFetch('/Users/me');
  if (!response.ok) {
    throw new Error(`Failed to fetch current user: ${response.status}`);
  }
  return await response.json();
}
