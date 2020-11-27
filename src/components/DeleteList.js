import React, { useState } from 'react'
import MyButton from './MyButton'
import { deleteList } from '../redux/actions/dataActions'
import styled from 'styled-components'
//MUI
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DeleteOutline from '@material-ui/icons/DeleteOutline'

const DeleteList = ({ listId }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const deleteThisList = () => {
    deleteList(listId)
    setOpen(false)
  }

  return (
    <>
      <DeleteButton onClick={handleOpen} >
        <DeleteOutline style={{color: '#fff'}}/>
      </DeleteButton>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>
          Are you sure you want to delete this list?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={deleteThisList} color='#fff'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const DeleteButton = styled(IconButton)`
  color: white;
  position: absolute;
  right: 0px;

`


export default DeleteList
