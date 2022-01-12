import {API_URL} from './../config'

export const listOfOrders  = (userId,token,)=>{

    return fetch(`${API_URL}/order/${userId}`,{
        method:"GET",
        headers: {
            // Accept: "application/json", we use it when  send data
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(res=>res.json())
}



export const getStatus  = (userId,token,)=>{

    return fetch(`${API_URL}/order/status/${userId}`,{
        method:"GET",
        headers: {
            // Accept: "application/json", we use it when  send data
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(res=>res.json())
}

export const updateOrderStatus  = (userId, token, orderId, status)=>{

    return fetch(`${API_URL}/order/${orderId}/status/${userId}`,{
        method:"PATCH",
        headers: {
            // Accept: "application/json",  //we use it when  send data
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({status})
    })
    .then(res=>res.json())
}