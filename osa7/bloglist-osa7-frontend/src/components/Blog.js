import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleRemove, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [minimized, setMinimized] = useState(true)

  const dispatch = useDispatch()

  const toggleMinimize = () => {
    setMinimized(!minimized)
  }

  const addLike = () => {
    //const toLike = blogs.find(a => a.id === id)
    //console.log(toLike)
    dispatch(likeBlog(blog))
    dispatch(setNotification(`Voted ${blog.title}`, 5))
  }

/*  
  const addLike = () => {
    handleLike( blog.id )
  }
*/  

  const remove = () => {
    //handleRemove({ blog })
    if (window.confirm(`Really delete blog ${blog.title}?`)) {
      dispatch(removeBlog(blog))
      dispatch(setNotification('Blog was removed.', 5))
    }
  }


  if (minimized) {
    return (
      <div id="blog-div" style={blogStyle}>
        {blog.title} - {blog.author}
        <button id='show-button' onClick={() => toggleMinimize()}>Show</button>
      </div>
    )
  } else {
    return (
      <div id="blog-div" style={blogStyle}>
        {blog.title} - {blog.author}
        <button onClick={() => toggleMinimize()}>Hide</button>
        <br></br>
        {blog.url}
        <br></br>
            Likes: {blog.likes} <button id="like-button" onClick={() => addLike()}>Like</button>
        <br></br>
            User: {blog.user.name}
        <br></br>
        {user.username === blog.user.username ?
          <button id="remove-button" onClick={() => remove()}>Remove</button>
          : <p></p>}

      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  //handleRemove: PropTypes.func.isRequired,
  //handleLike: PropTypes.func.isRequired
}

export default Blog