import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'Blogini',
    author: 'Blogisti',
    url: 'blogi.com',
    likes: 5
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Blogini'
  )

  expect(component.container).toHaveTextContent(
    'Blogisti'
  )

  expect(component.container).not.toHaveTextContent(
    'blogi.com'
  )

  expect(component.container).not.toHaveTextContent(
    'Likes'
  )
})