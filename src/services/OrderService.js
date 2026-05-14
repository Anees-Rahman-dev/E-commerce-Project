import axios from "axios"

const ORDER_API = 'http://localhost:3001/orders'
const PlaceNewOrder = async (order) => {

    const res = await axios.post(ORDER_API,order)
    return res
}

const GetUsersOrder = async (userId) => {
    const res = await axios.get(`${ORDER_API}?userId=${userId}`)
    return res.data
} 

export { PlaceNewOrder , GetUsersOrder }