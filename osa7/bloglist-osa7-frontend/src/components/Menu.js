import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }  
  
  const loggedUser = useSelector(state => {
    return state.loggedUser
  })

  return (
    <div>
      <Link style={padding} to='/blogs'>Blogs</Link>
      <Link style={padding} to='/users'>Users</Link>
      Logged in as {loggedUser}
      <Link style={padding} to='/logout'>Logout</Link>
    </div>
    )
}

export default Menu