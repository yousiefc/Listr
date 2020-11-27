import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import List from '../components/List'
import CurrentList from '../components/CurrentList'
import styled from 'styled-components'
import SearchDiv from '../components/SearchDiv'
import { getLists } from '../redux/actions/dataActions'
import { useSelector, useDispatch } from 'react-redux'
//MUI
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const Home = () => {
  const data = useSelector(state => state.data)
  const [listSelected, setListSelected] = useState(null)
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()

  /* GET LIST OF lISTS */
  useEffect(() => {
    getLists(dispatch)
  }, [])

  const descriptionElementRef = useRef(null)
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  /* HANDLE WIDGET CLICK */
  const handleClick = list => {
    setListSelected(list)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  /* RETURN ALL RECENT LISTS */
  const {lists, loading} = data
  let recentLists = !loading ? (
    lists.map(list => (
      <div onClick={() => handleClick(list)} key={list.listId}>
        <List
          key={list.listId}
          list={list}
          selected={listSelected && list.listId === listSelected.listId}
        />
      </div>
    ))
  ) : (
    <CircularProgress size={100} />
  )

  /* RETURN CURRENT SELECTED LIST */
  let currentList = listSelected ? (
    <CurrentList list={listSelected} dialog={false} />
  ) : (
    <Typography variant='h5' color='textSecondary'>
      Select a list to view it here!
    </Typography>
  )

  /* RENDER */
  return (
    <OuterDiv>
      <SearchDiv />
      <Grid container justify='center'>
        <OuterGrid container item md={10}>
          <ListWidgetGrid container item md={8} xs={12}>
            {recentLists}
          </ListWidgetGrid>

          <Hidden smDown>
            <CurrentListGrid item sm>
              {currentList}
            </CurrentListGrid>
          </Hidden>

          <Hidden mdUp>
            <Dialog
              open={open}
              onClose={handleClose}
              scroll='paper'
              aria-labelledby='scroll-dialog-title'
              aria-describedby='scroll-dialog-description'
              fullWidth={true}
              style ={{borderRadius: 20}}
            >
              <Content
                dividers={false}
                style={{ padding: 0, backgroundColor: '#4f0ee6' }}
              >
                <DialogContentText
                  id='scroll-dialog-description'
                  ref={descriptionElementRef}
                  tabIndex={-1}
                >
                  <CurrentList list={listSelected} dialog={true} />
                </DialogContentText>
              </Content>
              <DialogActions>
                <Button onClick={handleClose} color='primary'>
                  Close
                </Button>
                <Button onClick={handleClose} color='primary'>
                  Random
                </Button>
              </DialogActions>
            </Dialog>
          </Hidden>
        </OuterGrid>
      </Grid>
    </OuterDiv>
  )
}

/* STYLED COMPONENTS */
const OuterDiv = styled.div`
  flex-grow: 1;
  margin-top: 240px;

`
const OuterGrid = styled(Grid)`
  margin-top: 40px;
`

const ListWidgetGrid = styled(Grid)`
  @media (max-width: 960px) {
    justify-content: center;
  }
`
const Content = styled(DialogContent)`
  border-radius: 0;
  width: 100%;
`

const CurrentListGrid = styled(Grid)`
  margin-top: 20px;
  position: relative;
`

export default Home
