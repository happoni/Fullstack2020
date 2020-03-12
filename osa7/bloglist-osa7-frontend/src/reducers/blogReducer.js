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

export const removeBlog = (blog) => {
  return async dispatch => {
    const data = await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE',
      data: blog.id
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const data = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data: content
    })
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
    //console.log(blog.user)
    const toLike = {...blog, likes: blog.likes + 1 }
    //console.log(toLike)
    const data = await blogService.update(toLike.id, toLike)
    //console.log(data)
    dispatch({
      type: 'LIKE',
      data: toLike
    })
    //console.log(data)
  }
}

export default reducer