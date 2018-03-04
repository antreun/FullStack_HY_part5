import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  it('by default renders only title and author', () => {
    const blog = {
        title: "Blog title",
        author: "Who wrote it",
        url:"https://www.blog.com",
        likes: 3
    }

    const blogComponent = shallow(<Blog blog={blog} />)
    const infoDiv = blogComponent.find('.info')

    expect(infoDiv.text()).toContain(blog.title + " " + blog.author)
    expect(infoDiv.text()).not.toContain("likes")
  })
})


describe.only('<Blog />', () => {
  it('when clicked, shows full info', () => {
    const blog = {
        title: "Blog title",
        author: "Who wrote it",
        url:"https://www.blog.com",
        likes: 3
    }

    const blogComponent = shallow(<Blog blog={blog} />)

    const infoDiv = blogComponent.find('.info')
    infoDiv.simulate('click')
    const fullDiv = blogComponent.find('.info')

    expect(fullDiv.text()).toContain(blog.title + " " + blog.author)
    expect(fullDiv.text()).toContain("likes")
  })
})
