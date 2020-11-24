import React from 'react'
import Link from 'react-router-dom/Link'
import EditDetails from './EditDetails'
import { useSelector, useDispatch } from 'react-redux'
import MyButton from './MyButton'
//Material UI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'

const NavBar = () => {
  const authenticated = useSelector(state => state.user.authenticated)

  return (
    <AppBar style={{backgroundColor: '#fff'}} >
      <Toolbar className='nav-container'>
        {authenticated ? (
          <>
            <MyButton tip='Create A List'>
              <AddIcon color='primary' style={{fontSize: 30}} />
            </MyButton>
            <Link to='/'>
              <MyButton tip='Home'>
                <HomeIcon color='primary' style={{fontSize: 30}} />
              </MyButton>
            </Link>
            <MyButton tip='Notifications'>
              <Notifications color='primary' style={{fontSize: 30}} />
            </MyButton>
          </>
        ) : (
          <>
            <Button color='primary' size='large' component={Link} to='/'>
              Home
            </Button>
            <Button color='primary' size='large' component={Link} to='/login'>
              Login
            </Button>
            <Button color='primary' size='large' component={Link} to='/signup'>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
