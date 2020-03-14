import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Table } from 'react-bootstrap'

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
      <Table bordered>
        <thead>
          <tr>
            <th>Title of blog</th>
          </tr>
        </thead>
        <tbody>
          {user.blogs.map(b =>
            <tr key={b.id}>
              <td>
                {b.title}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default User