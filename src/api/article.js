import axios from '../utils/axiosService'

export const getArticle = () => {
    return axios.get(`/api/articleList`)
}