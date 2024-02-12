import HttpService from './HttpService'

export const postService = {
    query,
    getById,
    addPost,
}

function query() {
    return HttpService.get('posts');
}

function getById(userId) {
    return HttpService.get(`posts/${userId}`);
}

function addPost(post) {
    return HttpService.post(`posts`, post);
}


