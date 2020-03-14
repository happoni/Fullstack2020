import loginService from '../services/login'
import blogService from '../services/blogs'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_LOGIN':      
      return action.data
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const initializeLogin = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = await JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      dispatch({
        type: 'INIT_LOGIN',
        data: loggedUser
      })
    } else {
      dispatch({
        type: 'INIT_LOGIN',
        data: null
      })
    }
  }
}

export const login = (credentials) => {
  return async dispatch => {
    try {
      const loggingUser = await loginService.login(credentials)      
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggingUser))
      blogService.setToken(loggingUser.token) 
      dispatch({
        type: 'LOGIN',
        data: loggingUser
      })
    } catch (error) {
        console.log(error)
      }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.clear()
    await dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

export default reducer