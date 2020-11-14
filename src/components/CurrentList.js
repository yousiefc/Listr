import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
//MUI
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'

const CurrentList = list => {
  const styles = useStyles()
  const user = useSelector(state => state.user.credentials)

  return (
    <div className={styles.root}>
      <Paper
        className={styles.paper}
      >
        <List className={styles.listItem}
          subheader={
            <ListSubheader component='div' className={styles.subheader}>
              {list.list.title}
            </ListSubheader>
          }>
          {list.list.body.map(listItem => (
            <>
              <ListItem>
                <ListItemText primary={listItem} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Paper>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minWidth: 400,
    maxWidth: 500,
  },
  listItem: {
    backgroundColor: '#4a4d5b'
  },
  paper: {
    maxHeight: 800, 
    overflow: 'auto',
  },
  subheader: {
    fontSize: '2em',
    color: theme.palette.text.purple,
    backgroundColor: 'rgba(0,0,30,0.3)'
  }
}))

export default CurrentList
