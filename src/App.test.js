import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('by default only login form is shown', () => {
    app.update()
    const blogComponents = app.find(Blog)
    const loginForm = app.find(".login")
    expect(loginForm.text()).toContain("käyttäjätunnus")
    expect(blogComponents.length).toEqual(0)
  })
})

describe('<App />', () => {

  let app
  beforeAll(() => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    
    app = mount(<App />)
  })

  it('blogs are displayed for logged in user', () => {

    app.update()
    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(2)
  })
})
