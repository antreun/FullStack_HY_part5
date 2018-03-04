import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ onSubmit, handleChange, title, author, url}) => {
  return (
    <div>
      <h2>Create a new Blog</h2>

    <form onSubmit={onSubmit}>
      <div>
        title
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="author"
          value={author}
          onChange={handleChange}
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="url"
          value={url}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add blog</button>
    </form>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default BlogForm
