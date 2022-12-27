import axios from "axios";  

export type userType = {
    fullname?: string,
    email: string,
    password: string 
}

function request(method: string, url: string, payload: userType | undefined, token: string) {
    return axios({method, url, data: payload, headers: {
        "Authorization": `Bearer ${token}` 
    }})
}

export default request;