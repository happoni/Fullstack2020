import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import Blog from './components/Blog'
import User from './components/User'
import UserList from './components/UserList'
import Notification from './components/Notification'
import Menu from './components/Menu'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { Form, Button } from 'react-bootstrap'

import { Switch, Route } from 'react-router-dom'

import { getUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loggedUser, setLoggedUser] = useState(null)

  const blogFormRef = React.createRef()
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getUsers())
  }, [dispatch])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setLoggedUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedUser)
      )

      blogService.setToken(loggedUser.token)
      setLoggedUser(loggedUser)
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
    setLoggedUser(null)
    dispatch(setNotification('Logged out succesfully', 5))
  }

  const loginForm = () => (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
            <Form.Control
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}>
            </Form.Control>
          <Form.Label>Password:</Form.Label>
            <Form.Control
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}>
            </Form.Control>
          <Button variant="primary" id="login-button" type="submit">Login</Button>
        </Form.Group>
      </Form>
    </div>
  )

  if (loggedUser === null) {
    return (
      <div className="container">
        <h2>Blogs</h2>
        <h3>Please log in</h3>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  return (
    <div className="container">
      <Menu loggedUser={loggedUser} handleLogout={handleLogout} />
      <h2>Bloglist app</h2>
      <Notification />

      <Switch>
        <Route path='/blogs/:id'>
          <Blog loggeduser={loggedUser} />
        </Route>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/blogs'>
          <Togglable buttonLabel='New blog' ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <BlogList  />
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
      </Switch>
    </div>
  )
}

export default App