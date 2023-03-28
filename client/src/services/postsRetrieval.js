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
}

export default PostRetrieval;
