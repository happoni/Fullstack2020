import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

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
      <Table striped bordered>
        <thead>
          <tr>
            <th>Title</th>
            <th>Likes</th>
          </tr>
        </thead>
      <tbody>
        {blogs.map(blog => 
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </td>
            <td>
              {blog.likes}
            </td>
          </tr>)}      
      </tbody>
      </Table>
    </div>
  )
}

export default BlogList