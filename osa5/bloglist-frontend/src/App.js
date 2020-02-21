import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      setInfoMessage('Succesfully logged in')
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)  
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setInfoMessage('Logged out succesfully')
    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))        
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setInfoMessage('Blog added succesfully')
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const blogForm = () => (
    <div>
      <h4>Add a new blog</h4>
      <form onSubmit={addBlog}>
        <div>
            Title: 
            <input
              type="text"
              value={newTitle}
              name="title"
              onChange={handleTitleChange}
            />
          <br></br>
            Author:
            <input
              type="text"
              value={newAuthor}
              name="author"
              onChange={handleAuthorChange}
            />
          <br></br>
            Url:
            <input
              type="text"
              value={newUrl}
              name="url"
              onChange={handleUrlChange}
            />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )

  if (user === null) {
    return (
      <div>
        <h2>Blogs</h2>
        <h3>Please log in</h3>
          <Error message={errorMessage} />
          {loginForm()}     
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Error message={errorMessage} />
      <Notification message={infoMessage} />
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
        {blogForm()}
    </div>
  )
}

export default App