import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    const object = {title: title, author: author, url: url}
    dispatch(createBlog(object))
    dispatch(setNotification(`New blog '${title}' added.`, 5))
  }

  return (
    <div>
      <h4>Add a new blog</h4>
      <Form onSubmit={create}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control id="title" type="text" name="title" />
          <Form.Label>Author:</Form.Label>
          <Form.Control id="author" type="text" name="author" />
          <Form.Label>Url:</Form.Label>
          <Form.Control id="url" type="text" name="url" />
          <Button variant="primary" id="add-button" type="submit">Add</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm