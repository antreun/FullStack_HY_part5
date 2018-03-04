class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <BlogForm
        value={this.state.formInput}
        onSubmit={this.props.onSubmit}
        handleChange={this.handleLoginFieldChange}
      />
  )}
}
