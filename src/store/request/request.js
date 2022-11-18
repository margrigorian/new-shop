import axios from "axios";  

function request(method, url, payload, token) {
    return axios({method, url, data: payload, headers: {
        "Authorization": `Bearer ${token}` 
    }})
}

export default request;