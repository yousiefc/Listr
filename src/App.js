import './App.css'
import { Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import history from './utils/history'
import themeFile from './utils/theme'
import jwtDecode from 'jwt-decode'
//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
//Pages
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
//Components
import NavBar from './components/NavBar'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import AuthRoute from './utils/AuthRoute.js'

const theme = createMuiTheme(themeFile)
const token = localStorage.idToken

let authenticated
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false
  } else {
    authenticated = true
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <div className='App'>
          <Router history={history}>
            <NavBar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <AuthRoute
                  exact
                  path='/login'
                  component={Login}
                  authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path='/signup'
                  component={Signup}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    </Provider>
  )
}

export default App
