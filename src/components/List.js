import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import styled, { css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { likeList, unlikeList } from '../redux/actions/dataActions'
//Material UI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import { useTheme } from '@material-ui/core/styles'

const List = ({ list, selected }) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState(0)
  const user = useSelector(state => state.user)
  dayjs.extend(relativeTime)
  const theme = useTheme()

  const forceUpdate = () => {
    return () => setValue(value => ++value)
  }

  const likedList = () => {
    if (user.likes && user.likes.find(like => like.listId === list.listId))
      return true
    else return false
  }

  const likeThisList = () => {
    likeList(list.listId, dispatch)
  }

  const unlikeThisList = () => {
    unlikeList(list.listId, dispatch)
  }

  let authenticated = user.authenticated
  const likeButton = !authenticated ? (
    <HeartIconButton disableRipple={true}>
      <Link to='/login'>
        <FavoriteBorderIcon style={{ fontSize: 26, color: '#fff' }} />
      </Link>
    </HeartIconButton>
  ) : likedList() ? (
    <HeartIconButton onClick={unlikeThisList}>
      <FavoriteIcon style={{ fontSize: 26 }} />
    </HeartIconButton>
  ) : (
    <HeartIconButton onClick={likeThisList}>
      <FavoriteBorderIcon style={{ fontSize: 26 }} />
    </HeartIconButton>
  )

  return (
    <OuterCard raised={true} selected={selected} theme={theme}>
      <InnerCard>
        <TopContent>
          <ListWidgetTitle variant='h5'>{list.title}</ListWidgetTitle>
          <BookmarkIconButton>
            <BookmarkBorderIcon style={{ fontSize: 32 }} />
          </BookmarkIconButton>
        </TopContent>

        <BottomContent theme={theme}>
          <UserAvatar src='' />
          <ListWidgetUserHandle
            variant='body1'
            component={Link}
            to={`/users/${list.userHandle}`}
            noWrap={true}
          >
            {list.userHandle}
          </ListWidgetUserHandle>

          <ListWidgetTimestamp variant='body2'>
            {dayjs(list.createdAt).fromNow()}
          </ListWidgetTimestamp>

          <ListWidgetLikeCount variant='body1'>
            {list.likeCount}
          </ListWidgetLikeCount>

          {likeButton}
        </BottomContent>
      </InnerCard>
    </OuterCard>
  )
}

/* STYLED COMPONENTS */
const OuterCard = styled(Card)`
  display: flex;
  background-color: #fff;
  height: 170px;
  border-radius: 10px 10px 30px 30px;
  width: 260px;
  margin: 10px;
  box-sizing: border-box;

  ${props =>
    props.selected &&
    css`
      border: 4px solid ${props.theme.palette.primary.main};
      border-radius: 11px;
    `}
`

const InnerCard = styled(CardContent)`
  padding: 0;
  width: 100%;
  height: 100%;
`

const TopContent = styled.div`
  position: relative;
  padding: 20px;
  height: 35%;
`

const BottomContent = styled.div`
  position: relative;
  text-align: right;
  vertical-align: baseline;
  height: 42%;
  background-color: ${props => props.theme.palette.primary.main};
`

const ListWidgetTitle = styled(Typography)`
  color: #404040;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
`

const ListWidgetUserHandle = styled(Typography)`
  position: absolute;
  left: 35px;
  top: 5px;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
`
const ListWidgetTimestamp = styled(Typography)`
  position: absolute;
  right: 10px;
  top: 5px;
  color: #ddd;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
`

const ListWidgetLikeCount = styled(Typography)`
  position: absolute;
  right: 50px;
  bottom: 6px;
  color: #fff;
`

const HeartIconButton = styled(IconButton)`
  position: absolute;
  right: 21px;
  bottom: 8px;
  color: #fff;
  padding: 0;
`

const BookmarkIconButton = styled(IconButton)`
  position: absolute;
  right: 19px;
  top: -7px;
  padding: 0;
  color: #4f0ee6;
`

const UserAvatar = styled(Avatar)`
  height: 20px;
  width: 20px;
  position: absolute;
  top: 7px;
  left: 11px;
`

export default List
