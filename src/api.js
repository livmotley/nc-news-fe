import axios from 'axios';

const ncNewsAPI = axios.create({
    baseURL: 'https://backend-nc-news-xms8.onrender.com/api',
    timeout: 1000
});

export function getAllArticles(topic, sortOption, ascOrder) {
    const params = new URLSearchParams();

    if(topic) {
        params.set('topic', topic);
    }
    if(sortOption) {
        params.set('sort_by', sortOption);
    }
    if(ascOrder) {
        params.set('order', 'asc');
    }
    return ncNewsAPI.get(`/articles?${params.toString()}`)
}

export function getArticleById(id) {
    return ncNewsAPI.get(`/articles/${id}`)
}

export function getCommentsByArticle(id) {
    return ncNewsAPI.get(`/articles/${id}/comments`)
}

export function updateArticleVotes(id, vote) {
    return ncNewsAPI.patch(`/articles/${id}`, {inc_votes: vote})
}

export function addNewComment(id, request) {
    return ncNewsAPI.post(`/articles/${id}/comments`, request)
}

export function deleteComment(id) {
    return ncNewsAPI.delete(`/comments/${id}`)
}

export function getAllTopics() {
    return ncNewsAPI.get(`/topics`)
}
