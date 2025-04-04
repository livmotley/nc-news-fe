import axios from 'axios';

const ncNewsAPI = axios.create({
    baseURL: 'https://backend-nc-news-xms8.onrender.com/api',
    timeout: 1000
});

export function getAllArticles(topic, sortOption, ascOrder, page) {
    const params = new URLSearchParams();

    if(topic) {
        params.set('topic', topic);
    }
    if(sortOption) {
        if(sortOption === 'date') {
            sortOption = 'created_at'
        }
        params.set('sort_by', sortOption);
    }
    if(ascOrder) {
        params.set('order', 'asc');
    }
    params.set('limit', 10);
    params.set('p', page);
    return ncNewsAPI.get(`/articles?${params.toString()}`)
}

export function getArticleById(id) {
    return ncNewsAPI.get(`/articles/${id}`)
}

export function getCommentsByArticle(id, page) {
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

export function addNewArticle(request) {
    console.log(request);
    return ncNewsAPI.post(`/articles`, request)
}
