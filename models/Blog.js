const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required.']
    },
    title: {
        type: String,
        required: [true, 'Blog title is required.']
    },
    content: {
        type: String,
        required: [true, 'Blog content is required.']
    },
    author: {
        type: String,
        required: [true, 'Blog author is required.']
    },
    creationdate: {
        type: Number,
        required: [true, 'Blog creation date is required.'],
        min: [1888, 'Year must be after the first known blog release.']
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'User ID is required for a comment.']
            },
            blogId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Blog',
                required: [true, 'Blog ID is required for a comment.']
            },
            comments: {
                type: String,
                required: [true, 'Comment text is required.'],
            }
        }
    ]
});

module.exports = mongoose.model('Blog', blogSchema);
