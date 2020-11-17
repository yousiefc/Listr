import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import List from '../components/List'
import CircularProgress from '@material-ui/core/CircularProgress'
import CurrentList from '../components/CurrentList'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'

const Home = () => {
  const [lists, setLists] = useState(null)
  const [listSelected, setListSelected] = useState(null)

  /* GET LIST OF lISTS */
  useEffect(() => {
    const getLists = async () => {
      await axios
        .get('https://us-central1-listr-fcbc3.cloudfunctions.net/api/lists')
        .then(res => {
          setLists({
            lists: res.data,
          })
        })
        .catch(e => console.log(e))
    }
    getLists()
  }, [])

  /* RETURN ALL RECENT LISTS */
  let recentLists = lists ? (
    lists.lists.map(list => (
      <div onClick={() => setListSelected(list)}>
        <List
          key={list.listId}
          list={list}
          selected={listSelected ? list.listId === listSelected.listId : false}
        />
      </div>
    ))
  ) : (
    <CircularProgress size={100} />
  )

  /* RETURN CURRENT SELECTED LIST */
  let currentList = listSelected ? (
    <CurrentList list={listSelected} />
  ) : (
    <Typography variant='h5' color='textSecondary'>
      Select a list to view it here!
    </Typography>
  )

  /* RENDER */
  return (
    <OuterDiv>
      <OuterGrid container justify='center'>
        <ListWidgetGrid container item md={7} xs={12}>
          {recentLists}
        </ListWidgetGrid>
        <CurrentListGrid item>{currentList}</CurrentListGrid>
      </OuterGrid>
    </OuterDiv>
  )
}


/* STYLED COMPONENTS */
const OuterDiv = styled.div`
  flex-grow: 1;
`
const OuterGrid = styled(Grid)``

const ListWidgetGrid = styled(Grid)`
  @media (max-width: 960px) {
    justify-content: center;
  }
`

const CurrentListGrid = styled(Grid)``


export default Home
