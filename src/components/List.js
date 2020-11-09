import React from 'react'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
//Material UI
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
//import CardActionArea from '@material-ui/core/CardActionArea'
//import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  content: {
    padding: 25
  }
}))

const List = ({ list }) => {
  const classes = useStyles()
  dayjs.extend(relativeTime)

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography
          variant='h5'
          component={Link}
          to={`/users/${list.userHandle}`}
          color='primary'
        >
          {list.userHandle}
        </Typography>

        <Typography variant='body2' color='textSecondary'>
          {dayjs(list.createdAt).fromNow()}
        </Typography>

        <Typography variant='body1'>{list.body}</Typography>
      </CardContent>
    </Card>
  )
}

export default List
