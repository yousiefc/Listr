import React, { useState } from 'react'
import AppIcon from '../images/logo192.png'
import axios from 'axios'
import { Link } from 'react-router-dom'
import history from '../utils/history'
//Material UI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  form: {
    textAlign: 'center',
  },
  image: {
    margin: '30px auto 20px auto',
  },
  pageTitle: {
    margin: '15px auto 15px auto',
  },
  textField: {
    margin: '15px auto 15px auto',
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
  },
  progress: {
    position: 'absolute'
  }

}))

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const classes = useStyles()

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)

    const userData = {
      email,
      password,
    }

    axios
      .post(
        'https://us-central1-listr-fcbc3.cloudfunctions.net/api/login',
        userData
      )
      .then(res => {
        console.log(res.data)
        setIsLoading(false)
        history.push('/')
      })
      .catch(err => {
        setErrors(err.response.data)
        setIsLoading(false)
      })
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>

        <img src={AppIcon} alt='App' className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>
          Login
        </Typography>

        <form noValidate onSubmit={handleSubmit}>

          <TextField
            id='email'
            name='email'
            type='email'
            label='Email'
            className={classes.textField}
            value={email}
            onChange={e => setEmail(e.target.value)}
            helperText={errors.email}
            error={errors.email ? true : false}
            fullWidth
          />
          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            className={classes.textField}
            value={password}
            onChange={e => setPassword(e.target.value)}
            helperText={errors.password}
            error={errors.password ? true : false}
            fullWidth
          />

          {errors.general && (
            <Typography variant='body2' className={classes.customError}>
              {errors.general}
            </Typography>
          )}

          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={isLoading}
          >
            Login
            {isLoading && (
              <CircularProgress className={classes.progress} />
            )}
          </Button>

          <br />
          <small>
            Don't have an account? Sign up <Link to='/signup'>here</Link>
          </small>

        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}

export default Login
