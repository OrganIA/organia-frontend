import axios from "axios";

export default axios.create({
    baseURL: "http://organia.francecentral.cloudapp.azure.com:8000/api/v1/",
    mode: 'no-cors',
    headers: {
        "Content-Type": "application/json"
    },
});