import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders title and author', () => {
  const user = {
    username: 'testaaja',
    name: 'Kokeilija',
    password: 'salainen'
  }
  
  const blog = {
    title: 'Blogini',
    author: 'Blogisti',
    url: 'blogi.com',
    likes: 5
  }

  const component = render(
    <Blog blog={blog} user={user} />
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

test('clicking show-button reveals url and likes', () => {
  const user = {
    username: 'testaaja',
    name: 'Lashu',
    password: 'salainen'
  }
  
  const blog = {
    title: 'Blogini',
    author: 'Blogisti',
    url: 'blogi.com',
    likes: 5,
    user: {
      username: 'testaaja',
      name: 'Lashu',
      password: 'salainen'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} toggleMinimize={mockHandler} />
  )

  const button = component.getByText('Show')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Blogini'
  )

  expect(component.container).toHaveTextContent(
    'Blogisti'
  )

  expect(component.container).toHaveTextContent(
    'blogi.com'
  )

  expect(component.container).toHaveTextContent(
    'Likes'
  )
})