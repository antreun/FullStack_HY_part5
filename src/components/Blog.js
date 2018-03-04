import React from 'react'
import blogService from '../services/blogs'
import Notification from '../components/Notification'


class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.blog = this.props.blog
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }


  deleteBlog = (event) => {
    const blog = this.props.blog
    console.log("deleting blog "+blog.title)
    if (window.confirm("Are you sure you want to remove ''"+blog.title+"' by "+blog.author+"?")) {

      try{
        blogService
          .remove(blog._id)
          .then(response => {
            //poistetaan blogi parametrina saadun funktion kautta
            this.props.removeFunction(blog._id);
          })
        }catch(exception) {
            console.log("poistaminen ei onnistunut!")
        }
      } else {
        console.log("poisto peruttu")
      }

  }


  addLike = (event) => {
    //event.stopPropagation();  //estetään blogin piilottaminen
    const blog = this.props.blog
    console.log("adding like to "+blog.title)

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
          Notification("asd");
        })
      }catch(exception) {
          console.log("tykkääminen ei onnistunut!")
      }
  }


  render() {


    const  RemoveButton = (props) => {
          const blog = this.props.blog
          if (!blog.user || (blog.user.username === this.props.user.username)) {
            return (
              <button onClick={this.deleteBlog}>delete</button>
            )
          } else {
            return ( ""
            )
          }
      }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }



    if (this.state.visible) {

      const addedBy = this.blog.user ? this.blog.user.username : "Anonymous"
      return (
        <div className="info" style={blogStyle} onClick={this.toggleVisibility}>
          {this.blog.title} {this.blog.author}<br />
          <a target="_blank" href={this.blog.url}>{this.blog.url}</a><br />
          Added by {addedBy} <br />
          {this.blog.likes} likes <button onClick={this.addLike}>like</button><br />
          <RemoveButton user={this.blog.user}    />
        </div>
      )
    } else {
      return (
        <div className="info" style={blogStyle} onClick={this.toggleVisibility}>
          {this.blog.title} {this.blog.author}
          </div>
        )
      }
    }
}

export default Blog
