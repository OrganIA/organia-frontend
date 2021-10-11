import axios from "axios";

export default axios.create({
    baseURL: process.env.VUE_APP_API_LOCAL_URL,
    headers: {
        "Content-Type": "application/json",
    },
});