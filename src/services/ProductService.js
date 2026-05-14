
import axios from 'axios'
const getAllProducts  = async () => {
    const res = await axios.get(`http://localhost:3001/products`)
    return res.data
}

const SingleProductById = async (id) => {
 
    const res = await axios.get(`http://localhost:3001/products/${id}`)
    return res.data
    console.log(id)
}

export { SingleProductById , getAllProducts } 