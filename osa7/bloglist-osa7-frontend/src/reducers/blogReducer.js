import blogService from '../services/blogs'

const byLikes = (a1, a2) => a2.likes - a1.likes

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data.sort(byLikes)
    case 'LIKE':
      const liked = action.data
      return state.map(a => a.id === liked.id ? liked : a).sort(byLikes)
    case 'CREATE': 
      return [...state, action.data]
    case 'REMOVE':
      const id = action.data
      return state.filter(blog => blog.id !== id)
    default: 
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const toLike = {...blog, likes: blog.likes + 1 }
    await blogService.update(toLike.id, toLike)
    dispatch({
      type: 'LIKE',
      data: toLike
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const data = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE',
      data: blog.id
    })
  }
}

export default reducer