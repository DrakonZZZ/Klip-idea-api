const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.json({
      success: true,
      data: {
        allPosts,
      },
    });
  } catch (error) {
    res.status(500);
    res.json({ success: false, message: "we couldn't find the page" });
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json({
      sucessful: true,
      data: post,
    });
  } catch (error) {
    res.status(500);
    res.send({ success: false, error: 'Resource not found' });
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  const post = new Post({
    username: req.body.username,
    title: req.body.title,
    text: req.body.text,
    tag: req.body.tag,
  });
  try {
    const currentPost = await post.save();
    res.json({ success: true, data: currentPost });
  } catch (error) {
    res.status(500);
    res.send({ success: false, error: 'Resource not found' });
    console.log(error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      const updatePost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: req.body.title,
            body: req.body.body,
            tag: req.body.tag,
          },
        },
        { new: true }
      );

      res.json({
        sucessful: true,
        data: updatePost,
      });
    } else {
      res.status(403).json({
        sucessful: false,
        error: 'You are not authorized to update this post',
      });
    }
  } catch (error) {
    res.status(403).json({ success: false, error: 'Resource not found' });
    console.log(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      const deletePost = await Post.findByIdAndDelete(req.params.id);

      res.json({
        sucessful: true,
        message: 'Post deleted',
      });
    } else {
      res.status(403).json({ success: false, error: 'Unauthorized Acess' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Resource not found' });
    console.log(error);
  }
});

module.exports = router;
