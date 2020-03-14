import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Menu = ({loggedUser, handleLogout}) => {
  const padding = {
    paddingRight: 5
  }  
  
  return (
    <div>
      <Link style={padding} to='/blogs'>Blogs</Link>
      <Link style={padding} to='/users'>Users</Link>
      Logged in as {loggedUser.username}
      <Button variant="secondary" onClick={handleLogout}>Logout</Button>
    </div>
    )
}

export default Menu