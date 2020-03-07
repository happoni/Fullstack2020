import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const mockHandler = jest.fn()
  const mockRemoveHandler = jest.fn()

  beforeEach(() => {
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
      user: {user}
    }

    component = render(
      <Blog blog={blog} user={user} handleRemove={mockRemoveHandler} handleLike={mockHandler} />
    )
  })

  test('renders title and author', () => {
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

  test('clicking like two times calls event handler twice', () => {
    const showButton = component.getByText('Show')
    fireEvent.click(showButton)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})