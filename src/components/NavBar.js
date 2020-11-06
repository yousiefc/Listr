import React from 'react'
import Link from 'react-router-dom/Link'
//Material UI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

const NavBar = () => {
  return (
    <AppBar>
      <Toolbar className='nav-container'>
        <Button color='inherit' size='large' component={Link} to='/'>
          Home
        </Button>
        <Button color='inherit' size='large' component={Link} to='/login'>
          Login
        </Button>
        <Button color='inherit' size='large' component={Link} to='/signup'>
          Signup
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
