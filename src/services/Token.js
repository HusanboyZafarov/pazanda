export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  export const updateToken = (token) => {
    localStorage.setItem("token", token);
  };
  
  export const removeToken = () => {
    localStorage.removeItem("token");
  };
  