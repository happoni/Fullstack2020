import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [minimized, setMinimized] = useState(true)

  const toggleMinimize = () => {
    setMinimized(!minimized)
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
          Likes: {blog.likes}
          <br></br>
          User: {blog.user.name}
          <button onClick={() => toggleMinimize()}>Hide</button>      
      </div>
    )
  }
}

export default Blog