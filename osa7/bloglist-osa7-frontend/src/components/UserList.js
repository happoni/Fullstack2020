import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

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
      <Table bordered striped>
        <thead>
          <tr>
            <th>User</th>
            <th>Amount of blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => 
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
          </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList

