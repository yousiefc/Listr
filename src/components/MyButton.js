import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { Typography } from '@material-ui/core'

const MyButton = ({ children, onClick, tip, btnClassName, tipClassName }) => {
  return (
  <Tooltip title={<Typography variant='body1'>{tip}</Typography>} className={tipClassName}>
      <IconButton onClick={onClick} className={btnClassName}>
        {children}
      </IconButton>
    </Tooltip>
  )
}

export default MyButton
