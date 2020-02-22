import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h4>Add a new blog</h4>

      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            id="title"
            type="text"
            value={newTitle}
            name="title"
            onChange={handleTitleChange}
          />
          <br></br>
          Author:
          <input
            id="author"
            type="text"
            value={newAuthor}
            name="author"
            onChange={handleAuthorChange}
          />
          <br></br>
          Url:
          <input
            id="url"
            type="text"
            value={newUrl}
            name="url"
            onChange={handleUrlChange}
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