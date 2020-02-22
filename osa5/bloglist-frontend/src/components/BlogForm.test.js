import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import { prettyDOM } from '@testing-library/dom'

test('<BlogForm />', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, { target: { value: 'Mockailu kuuluu asiaan' } })
  fireEvent.change(author, { target: { value: 'M. Ock' } })
  fireEvent.change(url, { target: { value: 'www.mocking.fi' } })
  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Mockailu kuuluu asiaan')
  expect(createBlog.mock.calls[0][0].author).toBe('M. Ock')
  expect(createBlog.mock.calls[0][0].url).toBe('www.mocking.fi')
})