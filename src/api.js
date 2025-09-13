import axios from "axios";

const api=axios.create({
  bseURL:"",
});


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


