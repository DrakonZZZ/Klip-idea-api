import PostRetrieval from '../services/postsRetrieval';
const postsRetrieval = new PostRetrieval();

class PostList {
  constructor() {
    this._postListEl = document.getElementById('post-list');
    this._posts = [];
    this.#getPosts();
    this._allTags = new Set();
    this._allTags.add('technology');
    this._allTags.add('software');
    this._allTags.add('business');
    this._allTags.add('education');
    this._allTags.add('inventions');
    this._allTags.add('health');
    this.#eventHandler();
  }

  async #getPosts() {
    try {
      const res = await postsRetrieval.getPosts();
      this._posts = res.data.data.allPosts;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  addPost(post) {
    this._posts.push(post);
    this.render();
  }

  async delPost(e) {
    e.stopImmediatePropagation();
    if (e.target.classList.contains('fa-times')) {
      const elID = e.target.parentElement.parentElement.dataset.id;
      try {
        const res = await postsRetrieval.deletePost(elID);
        console.log(res);
        this._posts.filter((post) => post._id != elID);
        this.#getPosts();
      } catch (error) {
        alert("you can't delete this post");
      }
    }
  }

  #tagClass(tag) {
    tag = tag.toLowerCase();
    let tagName = '';
    if (this._allTags.has(tag)) {
      tagName = `tag-${tag}`;
    } else {
      tagName = '';
    }
    return tagName;
  }

  render() {
    this._postListEl.innerHTML = this._posts
      .map((post) => {
        const tagName = this.#tagClass(post.tag);
        return `
    <div class="card" data-id="${post._id}">
        <button class="delete"><i class="fas fa-times"></i></button>
        <h3>${post.title}</h3>
        <p>
            ${post.text}
        </p>
        <span class="tag ${tagName}">${post.tag.toUpperCase()}</span>
        <p>
            Posted on <span class="date">${post.date}</span> by
            <span class="author">${post.username}</span>
        </p>
    </div>`;
      })
      .join('');

    this.#eventHandler();
  }

  #eventHandler() {
    this._postListEl.addEventListener('click', (e) => this.delPost(e));
  }
}

export default PostList;
