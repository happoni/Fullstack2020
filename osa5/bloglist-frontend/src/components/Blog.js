import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [minimized, setMinimized] = useState(true)
  const [likes, setLikes] = useState(blog.likes)

  const toggleMinimize = () => {
    setMinimized(!minimized)
  }
  
  const addLike = () => {    
    blog.likes = blog.likes + 1
    blogService.update(blog.id, blog)
    setLikes(blog.likes)
  }

  if (minimized) {
    return (
      <div style={blogStyle}>
          {blog.title} - {blog.author} 
          <button onClick={() => toggleMinimize()}>Show</button>
      </div>
    )    
  } else {
    return (
      <div style={blogStyle}>
          {blog.title} - {blog.author}
          <br></br>
          {blog.url}
          <br></br>
          Likes: {likes} <button onClick={() => addLike()}>Like</button>
          <br></br>
          User: {blog.user.name}
          <button onClick={() => toggleMinimize()}>Hide</button>      
      </div>
    )
  }
}

export default Blog