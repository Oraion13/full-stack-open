import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Display'

describe('rendering tests', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'test title',
      author: 'test author',
      url: 'https://testurl.com',
      likes: 10,
      blogUser:[{
        name: 'tester' }
      ]
    }

    component = render(
      <Blog title={blog.title} author={blog.author} likes={blog.likes} url={blog.url} blogUser={blog.blogUser[0]}/>
    )
  })

  test('render content', () => {
    expect(component.container).toHaveTextContent(
      'test title'
    )
  })

  test('test view button ib blog', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'https://testurl.com'
    )
    expect(component.container).toHaveTextContent(10)
  })

  test('like button to be pressed twice', () => {


    const button = component.getByText('view')
    fireEvent.click(button)

    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)

    expect(component.container).toHaveTextContent(12)
  })
})

