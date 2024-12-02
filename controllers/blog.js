const Blog = require("../models/Blog");
const User = require("../models/User");
const {errorHandler} = require("../auth");
const mongoose = require("mongoose");

// Add new blog
module.exports.addBlog = async (req, res) => {
    try {
        const userId = req.user.id;

        const existingBlog = await Blog.findOne({ title: req.body.title, userId });

        if (existingBlog) {
            return res.status(409).send({ message: 'Blog already exists.' });
        }

        const newBlog = new Blog({
            userId: userId,
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            creationdate: req.body.creationdate,
            comments: req.body.comments
        });

        const savedBlog = await newBlog.save();

        res.status(201).send({
            blog: savedBlog,
        });
    } catch (err) {
        res.status(500).send({ message: 'Error adding blog.', error: err.message });
    }
};

// Retrieve all blogs
module.exports.getAllBlogs = (req, res) => {
    const userId = req.user.id;

    Blog.find({ userId })
        .then(blogs => {
            if (blogs.length > 0) {
                res.status(200).send({ blogs });
            } else {
                res.status(404).send({ message: 'No blogs found.' });
            }
        })
        .catch(err => errorHandler(err, req, res));
};

// Retrieve a blog by ID
module.exports.getBlogById = (req, res) => {
    const blogId = req.params.blogId;
    if (!blogId || !mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).send({ message: 'Invalid blog ID.' });
    }
    Blog.findById(blogId)
        .populate('userId', 'email')
        .populate('comments.userId', 'email')
        .then(blog => {
            if (!blog) {
                return res.status(404).send({ message: 'Blog not found.' });
            }

            res.status(200).send({
                message: 'Blog retrieved successfully.',
                blog
            });
        })
        .catch(err => errorHandler(err, req, res));
};

// Update a blog by ID
module.exports.updateBlog = (req, res) => {
    const userId = req.user.id;
    const blogId = req.params.blogId;
        
    const updatedBlog = {
        userId: userId,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        creationdate: req.body.creationdate,
        comments: req.body.comments
    };

    Blog.findByIdAndUpdate(blogId, updatedBlog, { new: true })
        .then(blog => {
            if (blog) {
                res.status(200).send({ message: 'Blog updated successfully', updatedBlog});
            } else {
                res.status(404).send({ message: 'Blog not found.' });
            }
        })
        .catch(err => errorHandler(err, req, res));
};

// Delete a blog by ID
module.exports.deleteBlog = (req, res) => {
    const userId = req.user.id;

    Blog.findByIdAndDelete(req.params.blogId)
        .then(blog => {
            if (blog) {
                res.status(200).send({ message: 'Blog deleted successfully.' });
            } else {
                res.status(404).send({ message: 'Blog not found.' });
            }
        })
        .catch(err => errorHandler(err, req, res));
};

// Add Blog Comment
module.exports.addBlogComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const blogId = req.params.blogId;

        // Find the blog to add a comment
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).send({ message: 'Blog not found.' });
        }

        // Check for duplicate comments by the same user on the same blog
        const existingComment = blog.comments.find(
            (comment) => comment.userId.toString() === userId && comment.comments === req.body.comments
        );

        if (existingComment) {
            return res.status(409).send({ message: 'Comment already exists.' });
        }

        // Create a new comment
        const newComment = {
            userId,
            blogId,
            comments: req.body.comments,
        };

        // Add the comment to the blog's comments array
        blog.comments.push(newComment);

        // Save the updated blog
        const updatedBlog = await blog.save();

        res.status(201).send({
            message: 'Comment added successfully.',
            blog: updatedBlog,
        });
    } catch (err) {
        res.status(500).send({
            message: 'Error adding comment.',
            error: err.message,
        });
    }
};

module.exports.getBlogComments = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blog = await Blog.findById(blogId).populate({
            path: 'comments.userId',
            select: '_id email',
        });

        if (!blog) {
            return res.status(404).send({ message: 'Blog not found.' });
        }

        res.status(200).send({
            comments: blog.comments,
        });
    } catch (err) {
        res.status(500).send({
            message: 'Error retrieving comments.',
            error: err.message,
        });
    }
};

// Delete a comment by ID
module.exports.deleteComment = (req, res) => {
    const userId = req.user.id;
    const { blogId, commentId } = req.params;

    Blog.findById(blogId)
        .then(blog => {
            if (!blog) {
                return res.status(404).send({ message: 'Blog not found.' });
            }
            const commentIndex = blog.comments.findIndex(
                comment => comment._id.toString() === commentId
            );

            if (commentIndex === -1) {
                return res.status(404).send({ message: 'Comment not found.' });
            }

            const comment = blog.comments[commentIndex];

            if (comment.userId.toString() !== userId && !req.user.isAdmin) {
                return res.status(403).send({ message: 'Unauthorized to delete this comment.' });
            }
            blog.comments.splice(commentIndex, 1);
            return blog.save();
        })
        .then(updatedBlog => {
            res.status(200).send({
                message: 'Comment deleted successfully.',
                blog: updatedBlog,
            });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error deleting comment.',
                error: err.message,
            });
        });
};
