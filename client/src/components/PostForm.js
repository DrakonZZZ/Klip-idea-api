class PostForm {
  constructor() {
    this._modal = document.getElementById('form-modal');
  }

  #eventListeners() {
    this._form.addEventListener('submit', this.#submitHandler.bind(this));
  }

  #submitHandler(e) {
    e.preventDefault();
    const post = {
      userName: this._form.elements.username.value,
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
    };
    console.log(post);

    this._form.elements.username.value = '';
    this._form.elements.text.value = '';
    this._form.elements.tag.value = '';
    window.dispatchEvent(new Event('collapseOff'));
  }

  render() {
    this._modal.innerHTML = `
    <form id="post-form">
    <div class="form-control">
        <label for="post-text">Enter a Username</label>
        <input type="text" name="username" id="username" />
    </div>
    <div class="form-control">
        <label for="idea-text">What's Your Idea?</label>
        <textarea name="text" id="idea-text"></textarea>
    </div>
    <div class="form-control">
        <label for="tag">Tag</label>
        <input type="text" name="tag" id="tag" />
    </div>
    <button class="btn" type="submit" id="submit">Submit</button>
</form>`;
    this._form = document.getElementById('post-form');
    this.#eventListeners();
  }
}

export default PostForm;
