import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'

const BlogList = (user) => {
  const blogs = useSelector(state => {
    return state.blogs
  })

  const dispatch = useDispatch()

  const like = (id) => {
    const toLike = blogs.find(a => a.id === id)
    //console.log(toLike)
    dispatch(likeBlog(toLike))
    dispatch(setNotification(`Voted '${toLike.title}'`, 5))
  }

//  console.log(user)

  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

/*
handleRemove={handleRemove}

<div key={blog.id}>
          <div>
            {blog.title}            
          </div>
          <div>
            has {blog.likes}
            <button onClick={() => like(blog.id)}>like</button>
          </div>
        </div>
*/

export default BlogList