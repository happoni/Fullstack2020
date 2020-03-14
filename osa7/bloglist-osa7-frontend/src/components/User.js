import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { getUsers } from '../reducers/usersReducer'

const User = () => {
  const users = useSelector(state => {
    return state.users
  })

  const match = useRouteMatch('/users/:id')
  const user = users.find(u => u.id === match.params.id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h3>{user.name}</h3>
      {user.blogs.map(b =>
        <li key={b.title}>
          {b.title}
        </li>
      )}
    </div>
  )
}

export default User