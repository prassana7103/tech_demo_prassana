export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    return !!token;
  }
  return false;
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
  }
};
