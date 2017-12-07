import axios from '../utils/axiosService'

export const demoApi = () => {
    return axios.get(`/api/products`)
}