import React from 'react'
import { useField } from '../hooks/index'
import { login } from '../reducers/loggedUserReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'

const Login = (props) => {
    const username = useField('text')
    const password = useField('password')
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogin = (event) => {
      event.preventDefault()
      try {
        dispatch(login({ username: username.field.value , password: password.field.value }))
        dispatch(setNotification(`Succesfully logged in user ${username}`, 5))
        username.reset()
        password.reset()
        history.push('/')
      } catch (error) {
        dispatch(setNotification('Wrong password or username', 5))
      }
    }

  return (
    <div>
      <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username:
            <input {...username} reset={null} />
          </div>
          <div>
            Password:
            <input {...password} reset={null} />
          </div>
          <div>
            <button id="login-button" type="submit">Login</button>
          </div>
      </form>
    </div>
  )
}

export default Login