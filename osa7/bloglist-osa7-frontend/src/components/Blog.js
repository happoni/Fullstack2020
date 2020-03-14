import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useRouteMatch } from 'react-router-dom'
import { ListGroup, Button } from 'react-bootstrap'

const Blog = (loggedUser) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogs = useSelector(state => {
    return state.blogs
  })

  const match = useRouteMatch('/blogs/:id')
  const blog = blogs.find(b => b.id === match.params.id)

  const dispatch = useDispatch()

  const addLike = async () => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`Liked '${blog.title}'`, 5))
  }
  
  const remove = async () => {
    if (window.confirm(`Really delete blog ${blog.title}?`)) {
      dispatch(removeBlog(blog))
      dispatch(setNotification(`Blog '${blog.title}' was removed.`, 5))
    }
  }

    if (!blog) {
      return null
    }

    return (
      <div id="blog-div" style={blogStyle}>
        <h3>{blog.title}</h3>
        <ListGroup variant="flush">
          <ListGroup.Item>Author: {blog.author}</ListGroup.Item>
          <ListGroup.Item>Url: {blog.url}</ListGroup.Item>
          <ListGroup.Item>Likes: {blog.likes}</ListGroup.Item>
          <ListGroup.Item><Button variant="success" id="like-button" onClick={() => addLike()}>Like</Button></ListGroup.Item>
          <ListGroup.Item>Added by: {blog.user.name}</ListGroup.Item>
        </ListGroup>
          {loggedUser.loggeduser.username === blog.user.username ?
            <Button variant="danger" id="remove-button" onClick={() => remove()}>Remove</Button>
            : <p></p>}
      </div>
    )
  }

export default Blog