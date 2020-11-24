import React, { useState } from 'react'
import AppIcon from '../images/logo192.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SignupUser, LogoutUser } from '../redux/actions/userActions'
import styled from 'styled-components'
//Material UI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Paper } from '@material-ui/core'

const Signup = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [handle, setHandle] = useState('')
  const isLoading = useSelector(state => state.UI.loading)
  const errors = useSelector(state => state.UI.errors)

  const handleSubmit = e => {
    e.preventDefault()

    const newUserData = {
      email,
      password,
      confirmPassword,
      handle,
    }

    SignupUser(newUserData, dispatch)
  }

  return (
      <FormDiv container>
        <Grid item sm />
        <Grid item sm>
          <Paper
            style={{ padding: 35, borderRadius: 10, borderColor: '#eee' }}
            variant='outlined'
          >
            <Image src={AppIcon} alt='App' />
            <PageTitle variant='h2' color='textPrimary'>
              Signup
            </PageTitle>

            <form noValidate onSubmit={handleSubmit}>
              <InputField
                id='handle'
                name='handle'
                type='text'
                label='Handle'
                value={handle}
                onChange={e => setHandle(e.target.value)}
                helperText={errors.handle}
                error={errors.handle ? true : false}
                fullWidth
              />
              <InputField
                id='email'
                name='email'
                type='email'
                label='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                helperText={errors.email}
                error={errors.email ? true : false}
                fullWidth
              />
              <InputField
                id='password'
                name='password'
                type='password'
                label='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                helperText={errors.password}
                error={errors.password ? true : false}
                fullWidth
              />
              <InputField
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                label='Confirm Password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                fullWidth
              />

              {errors.general && (
                <CustomError variant='body2'>{errors.general}</CustomError>
              )}

              <SubmitButton
                type='submit'
                variant='contained'
                color='primary'
                disabled={isLoading}
              >
                Signup
                {isLoading && <Progress />}
              </SubmitButton>

              <br />
              <small>
                Already have an account? Login <Link to='/login'>here</Link>
              </small>
            </form>
          </Paper>
        </Grid>
        <Grid item sm />
      </FormDiv>
  )

}

const FormDiv = styled(Grid)`
  text-align: center;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%238ec60c' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%2382b60b' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%238ec60c' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%2380b30b' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%238ec60c' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%237eaf0b' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%238ec60c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%237bac0a' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%238ec60c' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%2379a80a' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%238ec60c' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%2377a50a' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  height: 100%;
`
const Image = styled.img`
  margin: 25px auto 20px auto;
`

const PageTitle = styled(Typography)`
  margin: 5px auto 15px auto;
`
const InputField = styled(TextField)`
  margin: 15px auto 15px auto;
`

const SubmitButton = styled(Button)`
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;
`

const CustomError = styled(Typography)`
  color: red;
  font-size: 0.8rem;
`

const Progress = styled(CircularProgress)`
  position: absolute;
`

export default Signup
