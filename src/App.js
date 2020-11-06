import './App.css'
import { Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import history from './utils/history'
//Pages
import Home from './pages/home'
import Login from './pages/login'
import signup from './pages/signup'
//Components
import NavBar from './components/NavBar'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffc107',
    },
    secondary: {
      main: '#ffd180',
    },
  },
  typography: {
    useNextVariants: true,
  }
})

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <Router history={history}>
          <NavBar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  )
}

export default App
