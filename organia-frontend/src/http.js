import axios from "axios";

export default axios.create({
    baseURL: "URL VERS LE BACK",
    mode: 'no-cors',
    headers: {
        "Content-Type": "application/json"
    },
});