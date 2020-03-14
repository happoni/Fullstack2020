import userService from '../services/users'

const byBlogs = (b1, b2) => b2.blogs.length - b1.blogs.length

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS':
       return action.data.sort(byBlogs)    
    //case 'INIT_USERS':
    //  return action.data.sort(byBlogs)
    //case 'UPDATE_USER':
    //  const updated = action.data
    //  return state.map(u => u.id === updated.id ? updated : u).sort(byBlogs)
    default:
      return state
  }
}

export const getUsers = () => {
  return async dispatch => {
    const data = await userService.getAll()
    dispatch({
      type: 'GET_USERS',
      data
    })
  }
}

/*
export const initializeUsers = () => {
  return async dispatch => {
    const data = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data
    })
  }
}
*/

/*
export const updateUser = (user, blog) => {
  return async dispatch => {
    const toUpdate = {...user, blogs: user.blogs.concat(blog) }    
    dispatch({
      type: 'UPDATE_USER',
      data: toUpdate
    })
  }
}
*/

export default usersReducer