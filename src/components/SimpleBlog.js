import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div>
      <div className="blogTitle">{blog.title}</div>
      <div className="blogAuthor">{blog.author}</div>
    </div>
    <div className="likesCount">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
