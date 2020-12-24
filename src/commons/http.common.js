import axios from "axios";


const authHeader = () => {
    
    const token = localStorage.getItem('token');

    if(token) {
        return {Authorization: `Bearer ${token}`}
    } else {
        return {}
    }
}

export default axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
      "Content-type": "application/json",
      ...authHeader()
    }
})



