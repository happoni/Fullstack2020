import userService from '../services/users'

const byBlogs = (b1, b2) => b2.blogs.length - b1.blogs.length

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS':
       return action.data.sort(byBlogs)    
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

export default usersReducer