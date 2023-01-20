import axios from "axios";  

export type UserType = {
    fullname?: string,
    email: string,
    password: string 
}

type SendProductType = {
    product_id: string,
    type?: string,
    action?: string,
}

type CommentType = {
    product_id: string,
    body: string
}

function request(method: string, url: string, payload: UserType | SendProductType | CommentType | undefined, token: string) {
    return axios({method, url, data: payload, headers: {
        "Authorization": `Bearer ${token}` 
    }})
}

export default request;