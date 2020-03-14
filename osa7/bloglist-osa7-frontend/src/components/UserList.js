import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const UserList = () => {
  const dispatch = useDispatch()
  dispatch(getUsers())
  const users = useSelector(state => {
    return state.users
  })

  if (!users) {
    return null
  }

  return (
    <div>
      <h3>Users</h3>
      <ul>
      {users.map(user => 
        <li key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>, has {user.blogs.length} blogs.
        </li>
      )}
      </ul>
    </div>
  )
}

export default UserList

