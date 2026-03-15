import axios from "axios";

export default axios.create({
    baseURL: import.meta.VITE_BACKEND_URL,

})