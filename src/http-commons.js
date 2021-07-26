import axios from "axios";


export const http =  axios.create({
    baseURL: "http://localhost:2222/api",
    headers: {
        "Content-type": "application/json"
    }
})

