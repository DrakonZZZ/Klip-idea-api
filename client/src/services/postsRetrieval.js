import axios from 'axios';

class PostRetrieval {
  constructor() {
    this._url = 'http://localhost:8000/static/api/posts';
  }

  getPosts() {
    return axios.get(this._url);
  }

  createPost(data) {
    return axios.post(this._url, data);
  }

  updatePost(id, data) {
    return axios.patch(`${this._url}/${id}`, data);
  }

  deletePost(id) {
    const username = localStorage.getItem('username')
      ? localStorage.getItem('username')
      : '';
    return axios.delete(`${this._url}/${id}`, {
      data: {
        username: username,
      },
    });
  }
}

export default PostRetrieval;
