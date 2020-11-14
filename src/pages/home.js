import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import List from '../components/List'
import CircularProgress from '@material-ui/core/CircularProgress'
import CurrentList from '../components/CurrentList'
import { Typography } from '@material-ui/core'

const Home = () => {
  const [lists, setLists] = useState(null)
  const [listSelected, setListSelected] = useState(null)

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

  let recentLists = lists ? (
    lists.lists.map(list => (
      <Grid key={list.listId} item style={{width: '210px'}} >
        <div onClick={() => setListSelected(list)}>
          <List
            key={list.listId}
            list={list}
            selected={
              listSelected ? list.listId === listSelected.listId : false
            }
          />
        </div>
      </Grid>
    ))
  ) : (
    <CircularProgress size={100} />
  )

  let currentList = listSelected ? (
    <CurrentList list={listSelected} />
  ) : (
    <Typography variant='h5' color='textSecondary'>
      {' '}
      Select a list to view it here!
    </Typography>
  )

  return (
    <div style={{ flex: 1 }}>
      <Grid container justify='center'>
        <Grid container md={7} xs={12} spacing={2}>
          {recentLists}
        </Grid>
        <Grid item >
          {currentList}
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
