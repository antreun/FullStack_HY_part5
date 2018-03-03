import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  addLike = (event) => {
    console.log("adding like")
    //event.stopPropagation();  //estetään blogin piilottaminen
    const blog = this.props.blog

    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    try{
      blogService
        .update(blog._id, blogObject)
        .then(newBlog => {
          this.props.blog.likes += 1
        })
      }catch(exception) {
          console.log("tykkääminen ei onnistunut!")
      }
  }

  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const blog = this.props.blog

    if (this.state.visible) {
      return (
        <div style={blogStyle} onClick={this.toggleVisibility}>
          {blog.title} {blog.author}<br />
          <a target="_blank" href={blog.url}>{blog.url}</a><br />
          {blog.likes} likes <button onClick={this.addLike}>like</button>
        </div>
      )
    } else {
      return (
        <div style={blogStyle} onClick={this.toggleVisibility}>
          {blog.title} {blog.author}
          </div>
        )
      }
    }
}

export default Blog
