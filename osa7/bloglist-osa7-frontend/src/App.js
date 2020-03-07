import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  const dispatch = useDispatch()

  

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      dispatch(setNotification('Succesfully logged in', 5))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong username or password!', 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    dispatch(setNotification('Logged out succesfully', 5))
  }

  const handleLike = async ({ blog }) => {
    try {  
      const id = blog.id
      const newLikes = (blog.likes + 1)

      const updatedBlog = {
        user: id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: newLikes
      }

      await blogService.update(id, updatedBlog)
      setBlogs(await blogService.getAll())
      dispatch(setNotification(`Like added to blog ${blog.title}`, 5))
    } catch (error) {
      dispatch(setNotification(error.message, 5))
    }
  }

  const handleRemove = async ({ blog }) => {
    if (window.confirm(`Really delete blog ${blog.title}?`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      dispatch(setNotification('Blog was deleted', 5))
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        dispatch(setNotification('Blog added succesfully', 5))
      })
      .catch(error => {
        dispatch(setNotification(error.response.data.error, 5))
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='New blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Blogs</h2>
        <h3>Please log in</h3>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification  />
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>
            Logout
        </button>
      </div>
      {blogs.sort((a, b) => {
        return b.likes - a.likes
      }).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} handleRemove={handleRemove} handleLike={handleLike} />
      )}
      {blogForm()}
    </div>
  )
}

export default App