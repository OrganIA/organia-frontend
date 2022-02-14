import axios from "axios";

export default axios.create({
    baseURL: process.env.VUE_APP_API_REMOTE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});