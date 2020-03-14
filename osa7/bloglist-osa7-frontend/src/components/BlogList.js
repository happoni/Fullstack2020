import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => {
    return state.blogs
  })

  if (!blogs) {
    return null
  }

  return (
    <div>
      <h3>Blogs</h3>
      <ul>
        {blogs.map(blog => 
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>)}
      </ul>
    </div>
  )
}

export default BlogList