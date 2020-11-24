import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { editUserDetails } from '../redux/actions/userActions'
//MUI
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core'

const EditDetails = () => {
  const dispatch = useDispatch()
  const credentials = useSelector(state => state.user.credentials)
  const [handle, setHandle] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setHandle(credentials.handle)
  }, [open])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    const userDetails = {
      handle: handle
    }
    editUserDetails(userDetails, dispatch)
    handleClose()
  }

  return (
    <>
      <Tooltip title='Edit details' placement='top'>
        <IconButton onClick={handleOpen}>
          <EditIcon color='#fff' />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle> Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='handle'
              type='text'
              label='Handle'
              rows='1'
              placeholder='Your user handle'
              value={handle}
              onChange={e => setHandle(e.target.value)}
              fullWidth
            ></TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditDetails
