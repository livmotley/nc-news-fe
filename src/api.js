import axios from 'axios';

const ncNewsAPI = axios.create({
    baseURL: 'https://backend-nc-news-xms8.onrender.com/api',
    timeout: 1000
});

export function getAllArticles() {
    return ncNewsAPI.get('/articles')
}

export function getArticleById(id) {
    return ncNewsAPI.get(`/articles/${id}`)
}

export function getCommentsByArticle(id) {
    return ncNewsAPI.get(`/articles/${id}/comments`)
}