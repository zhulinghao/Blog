import axios from '../utils/axiosService'

export const getArticle = () => {
    return axios.get(`/api/articleList`)
}
export const getArticleType = () => {
    return axios.get(`/api/articleType`)
}