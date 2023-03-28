import PostRetrieval from '../services/postsRetrieval';
import PostList from './PostList';

class PostForm {
  constructor() {
    this._modal = document.getElementById('form-modal');
    this._postRetrieval = new PostRetrieval();
    this._postList = new PostList();
  }

  async #submitHandler(e) {
    e.preventDefault();
    const post = {
      title: this._form.elements.title.value,
      username: this._form.elements.username.value,
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
    };

    const newPost = await this._postRetrieval.createPost(post);

    this._postList.addPost(newPost.data.data);

    this._form.elements.title.value = '';
    this._form.elements.text.value = '';
    this._form.elements.username.value = '';
    this._form.elements.tag.value = '';
    window.dispatchEvent(new Event('collapseOff'));
  }

  render() {
    this._modal.innerHTML = `
    <form id="post-form">
    <div class="form-control">
      <label for="post-title">Title</title>
      <input type="text" name="title" id="title">
    <div>
    <div class="form-control">
        <label for="post-text">What's Your Idea?</label>
        <textarea name="text" id="post-text"></textarea>
    </div>
    <div class="form-control">
        <label for="tag">Tag</label>
        <input type="text" name="tag" id="tag" />
    </div>
    <div class="form-control">
    <label for="post-name">Enter a Username</label>
    <input type="text" name="username" id="username" />
    </div>
    <button class="btn" type="submit" id="submit">Submit</button>
</form>`;
    this._form = document.getElementById('post-form');
    this.#eventListeners();
  }

  #eventListeners() {
    this._form.addEventListener('submit', (e) => this.#submitHandler(e));
  }
}

export default PostForm;
