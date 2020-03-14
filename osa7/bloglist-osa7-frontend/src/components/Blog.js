import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { getUsers } from '../reducers/usersReducer'
import { useRouteMatch } from 'react-router-dom'

const Blog = () => {
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
        <p>Author: {blog.author}</p>
        <p>Url: {blog.url}</p>
        <p>Likes: {blog.likes}</p><button id="like-button" onClick={() => addLike()}>Like</button>
        <p>User: {blog.user.name}</p>
        <br></br>
          <button id="remove-button" onClick={() => remove()}>Remove</button>
      </div>
    )
  }

export default Blog