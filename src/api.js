import axios from "axios";

const api=axios.create({
  baseURL:"http://localhost:8080",
});


export const login = (credentials) => {
  return api.post("/auth/login", credentials);
};

export const signUp=(credentials)=>{
  return api.post("/auth/register",credentials);
}

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(error)=>Promise.reject(error)
);
 
export default api;


