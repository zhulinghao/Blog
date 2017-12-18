import axios from '../utils/axiosService'

export const examine = () => {
    return axios.get(`/api/examine`)
}
export const logOut = () => {
    return axios.get(`/api/logOut`)
}