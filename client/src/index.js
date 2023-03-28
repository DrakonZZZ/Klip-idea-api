import '@fontsource/poppins';
import '@fortawesome/fontawesome-free/css/all.css';
import './css/style.css';
import './components/Modal';
import './components/PostForm';
import Modal from './components/Modal';
import PostForm from './components/PostForm';

const modal = new Modal();
const postForm = new PostForm();

postForm.render();
