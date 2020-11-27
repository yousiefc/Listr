import React from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import DeleteList from './DeleteList'
//MUI
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import { useTheme } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton'

const CurrentList = ({ list, dialog }) => {
  const user = useSelector(state => state.user)
  const theme = useTheme()

  const deleteButton =
    user.authenticated && list.userHandle === user.credentials.handle ? (
      <DeleteList listId={list.listId} />
    ) : null

  const closeButton = user.authenticated && list.userHandle === user.credentials.handle ? (
    <CloseButton disableRipple={true} disableFocusRipple={true}>
      <CloseIcon />
    </CloseButton>
  ) : null

  return (
    <>
      <Root dialog={dialog}>
        <ListPaperBackground elevation={6}>
          <SelectedList
            subheader={
              <SelectedListSubheader component='div' theme={theme}>
                {list.title}
                {deleteButton}
              </SelectedListSubheader>
            }
          >
            {list.body.map(listItem => (
              <>
                <ListItem>
                  <ListItemText primary={listItem} />
                  {closeButton}
                </ListItem>
                <Divider />
              </>
            ))}
          </SelectedList>
        </ListPaperBackground>
      </Root>
    </>
  )
}

/* STYLED COMPONENTS */
const Root = styled.div`
  position: fixed;
  width: 28%;
  margin-right: 50px;

  ${props =>
    props.dialog &&
    css`
      position: relative;
      width: 100%;
    `}
`
const ListPaperBackground = styled(Paper)`
  max-height: 750px;
  overflow: auto;
  border-radius: 6px;
  position: relative;
`

const SelectedList = styled(List)`
  background-color: #fff;
`
const SelectedListSubheader = styled(ListSubheader)`
  font-size: 2em;
  font-weight: 600;
  color: #fff;
  background-color: ${props => props.theme.palette.primary.main};
  box-shadow: 0 5px 7px -2px #777;
`

const CloseButton = styled(IconButton)`
    postion: absolute;
    right: -4px;
    padding: 0;
`

export default CurrentList
