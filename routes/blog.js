const express = require('express');
const blogController = require('../controllers/blog');
const auth = require("../auth");
const { verify, isLoggedIn, verifyAdmin } = auth;

const router = express.Router();

// Add new blog
router.post('/addBlog', verify, isLoggedIn, blogController.addBlog);

// Retrieve all blogs
router.get('/getBlogs', verify, blogController.getAllBlogs);

// Retrieve a blog by ID
router.get('/getBlog/:blogId', blogController.getBlogById);

// Update a blog by ID
router.patch('/updateBlog/:blogId', verify, isLoggedIn, blogController.updateBlog);

// Delete a blog by ID
router.delete('/deleteBlog/:blogId', verify, isLoggedIn, blogController.deleteBlog);

// Add new comment
router.patch('/addComment/:blogId', verify, isLoggedIn, blogController.addBlogComment);

// Retrieve all comments
router.get('/getComments/:blogId', verify, isLoggedIn, blogController.getBlogComments);

// Delete a posts by ID
router.delete('/deleteComment/:blogId', verify, isLoggedIn, blogController.deleteComment);

module.exports = router;
