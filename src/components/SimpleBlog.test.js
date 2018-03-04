import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
        title: "Blog title",
        author: "Who wrote it",
        url:"https://www.blog.com",
        likes: 3
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleDiv = blogComponent.find('.blogTitle')
    const authorDiv = blogComponent.find('.blogAuthor')
    const likesDiv = blogComponent.find('.likesCount')


    expect(titleDiv.text()).toContain(blog.title)
    expect(authorDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain("blog has 3 likes")
  })
})

describe.only('<SimpleBlog />', () => {
  it('has a working like-button', () => {
    const blog = {
        title: "Blog title",
        author: "Who wrote it",
        url:"https://www.blog.com",
        likes: 3
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
    const likeButton = blogComponent.find('button')
    likeButton.simulate('click')
    likeButton.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
