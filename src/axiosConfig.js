import axios from'axios';

const axiosBase= axios.create({
    // baseURL: "http://localhost:5500/api"
   baseURL: "https://evangadi-forum-backend-bq0i.onrender.com/api"
})

export default axiosBase
