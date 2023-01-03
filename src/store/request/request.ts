import axios from "axios";  

export type UserType = {
    fullname?: string,
    email: string,
    password: string 
}

type SendProductType = {
    product_id: string,
    type?: string,
    action?: string
}

// type ProductIdType = {
//     product_id: string,
// }

function request(method: string, url: string, payload: UserType | SendProductType | undefined, token: string) {
    return axios({method, url, data: payload, headers: {
        "Authorization": `Bearer ${token}` 
    }})
}

export default request;