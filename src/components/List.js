import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
//Material UI
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
//import CardActionArea from '@material-ui/core/CardActionArea'
//import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const List = ({ list, selected }) => {
  const styles = useStyles()
  dayjs.extend(relativeTime)

  return (
    <Card className={selected ? styles.cardSelected : styles.card} raised={true} >
      <CardContent className={styles.content}>
        <Typography variant='h5' color='textPrimary'>{list.title}</Typography>

        <div className={styles.bottom}>
          <Typography
            className={styles.linkColor}
            variant='body1'
            component={Link}
            to={`/users/${list.userHandle}`}
            noWrap={true}
          >
            {list.userHandle}
          </Typography>

          <Typography variant='body2' color='textSecondary'>
            {dayjs(list.createdAt).fromNow()}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    backgroundColor: '#343747',
    height: 150,
    borderRadius: '5px 5px 40px 40px'
  },
  cardSelected: {
    display: 'flex',
    backgroundColor: '#343747',
    height: 150,
    boxShadow: `1px 1px 4px 4px ${theme.palette.text.purple}`
  },
  content: {
    padding: 25,
    position: 'relative'
  },
  bottom: {
    position: 'absolute',
    bottom: 5,
  },
  linkColor: {
    color: theme.palette.text.purple
  }
}))

export default List
