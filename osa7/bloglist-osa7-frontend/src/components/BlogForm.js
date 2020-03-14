import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { getUsers, updateUser } from '../reducers/usersReducer'

const BlogForm = (loggedUser) => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    const object = {title: title, author: author, url: url}
    dispatch(createBlog(object))
    //dispatch(updateUser(loggedUser, object))
    dispatch(setNotification(`New blog '${title}' added.`, 5))
  }

  return (
    <div>
      <h4>Add a new blog</h4>
      <form onSubmit={create}>
        <div>
          Title:
          <input
            id="title"
            type="text"
            name="title"
          />
          <br></br>
          Author:
          <input
            id="author"
            type="text"
            name="author"
          />
          <br></br>
          Url:
          <input
            id="url"
            type="text"
            name="url"
          />
        </div>
        <div>
          <button id="add-button" type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm