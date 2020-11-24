import './App.css'
import { Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import history from './utils/history'
import themeFile from './utils/theme'
import jwtDecode from 'jwt-decode'
//Redux
import { useDispatch } from 'react-redux'
import { SET_AUTHENTICATED } from './redux/types'
import { LogoutUser, GetUserData } from './redux/actions/userActions'
//Pages
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
//Components
import NavBar from './components/NavBar'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import AuthRoute from './utils/AuthRoute.js'
import axios from 'axios'

const theme = createMuiTheme(themeFile)
const token = localStorage.idToken

const App = () => {
  const dispatch = useDispatch()

  if (token) {
    const decodedToken = jwtDecode(token)
    if (decodedToken.exp * 1000 < Date.now()) {
      dispatch(LogoutUser())
      window.location.href = '/login'
    } else {
      dispatch({ type: SET_AUTHENTICATED })
      axios.defaults.headers.common['Authorization'] = token
      GetUserData(dispatch)
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <Router history={history}>
          <NavBar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <AuthRoute exact path='/login' component={Login} />
              <AuthRoute exact path='/signup' component={Signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  )
}

export default App
