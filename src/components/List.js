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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Avatar from '@material-ui/core/Avatar';

const List = ({ list, selected }) => {
  const styles = useStyles()
  dayjs.extend(relativeTime)

  return (
    <Card
      className={selected ? styles.cardSelected : styles.card}
      variant='outlined'
    >
      <CardContent className={styles.content}>
        <div>
          <div className={styles.top}>
            <Typography variant='h5' style={{color: '#343747'}}>
              {list.title}
            </Typography>
          </div>

          <div className={styles.bottom}>
            <Avatar src='' className={styles.avatar} />
            <Typography
              className={styles.linkColor}
              variant='body1'
              component={Link}
              to={`/users/${list.userHandle}`}
              noWrap={true}
              style={{position: 'absolute', left: 35, top: 5}}
            >
              {list.userHandle}
            </Typography>

            <Typography variant='body2' color='textSecondary' style={{position: 'absolute', right: 10, top: 5, color: '#c1c1c1'}}>
              {dayjs(list.createdAt).fromNow()}
            </Typography>

            <Typography variant='body1' style={{position: 'absolute', right: 50 ,bottom: 6, color: '#fff'}} >
              {list.likeCount}
            </Typography>
            <FavoriteBorderIcon style={{position: 'absolute', right: 20, bottom: 7, color: '#fff' }}/>

          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    backgroundColor: '#fff',
    height: 160,
    borderRadius: '7px 7px 30px 30px',
    boxShadow: '0 0 0 0',
    width: 260,
    margin: 10
  },
  cardSelected: {
    display: 'flex',
    backgroundColor: '#fff',
    height: 160,
    borderWidth: 0,
    boxShadow: `1px 1px 4px 4px ${theme.palette.text.purple}`,
    width: 260,
    margin: 10
  },
  content: {
    padding: 0,
    display: 'block',
    width: `100%`
  },
  top: {
    padding: 15,
    height: 73,
    width: `88%`,
    borderColor: '#ddd',
    borderWidth: 2,
  },
  bottom: {
    position: 'relative',
    textAlign: 'right',
    verticalAlign: 'baseline',
    width: `100%`,
    height: 57,
    boxShadow: '1px -5px 7px -5px #333',
    backgroundColor: '#4a4d71',

  },
  linkColor: {
    color: '#fff'
  },
  avatar: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 5,
    left: 11
  }
}))

export default List
