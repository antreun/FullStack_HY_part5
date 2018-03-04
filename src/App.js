import React from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      username: "",
      password: "",
      blogs: []
    }
  }

  componentDidMount() {
    blogService.getAll()


    .then(blogs => {
      blogs = this.sortBlogsByLikes(blogs)
      this.setState({ blogs })
    }
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  logout = async (event) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.setState({user:null})
    this.notify('Kirjauduttu ulos!')
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      this.setState({ username: '', password: '', user})
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.notify('Kirjautuminen onnistui!')
    } catch(exception) {
      this.notify('Käyttäjätunnus tai salasana virheellinen!')
    }
  }

  removeBlog = (id) => {
    const remaining = this.state.blogs.filter(x=> x._id !== id);
    this.setState({ blogs : remaining })
  }

  newBlog = (event) => {
    event.preventDefault()
    this.blogForm.toggleVisibility()
    try{

      const blogObject = {
        user: this.state.user,
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }

      blogService
        .create(blogObject)
        .then(newBlog => {
          newBlog.user = this.state.user
          let newBlogs = this.state.blogs.concat(newBlog)
          newBlogs = this.sortBlogsByLikes(newBlogs)
          this.setState({
            blogs: newBlogs,
            title: '',
            author: '',
            url: ''
          })

          this.notify('Lisätty blogi \''+newBlog.title+'\', kirjoittaja: '+newBlog.author)
        })
  }catch(exception) {
    this.notify('Blogin lisääminen ei onnistunut!')
  }
}

  notify = async (message) => {
    this.setState({
      error: message,
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }

  sortBlogsByLikes(b) {
    console.log("sorting...")

    //let sortedBlogs = this.state.blogs
    //console.log(sortedBlogs)
    b.sort(function(a,b) {

        if (a.likes > b.likes) {
          return -1;
        }
        else {
          return 1;
        }


      })

      return b
    }



  render() {

    if (this.state.user === null) {
      return (
        <form onSubmit={this.login}>
        <Notification message={this.state.error}/>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      )
    }

    return (
      <div>
        <Notification message={this.state.error}/>

        <p>{this.state.user.name} logged in &nbsp;
          <button onClick={this.logout}>Logout!</button>
        </p>

        <h2>Blogs</h2>

        <Togglable buttonLabel="New Blog" ref={component => this.blogForm = component}>
          <BlogForm
            onSubmit={this.newBlog}
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
            handleChange={this.handleLoginFieldChange}
          />
        </Togglable>

        <h3>Blog listing</h3>

        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} user={this.state.user} removeFunction={this.removeBlog}/>
        )}
      </div>
    );
  }
}

export default App;
