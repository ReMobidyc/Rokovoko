import axios from "axios";

export default axios.create({

    baseUrl: "http://localhost:2222/api",
    headers: {
        "Content-type": "application/json"
    }
})