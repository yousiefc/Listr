import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import List from '../components/List'
import CircularProgress from '@material-ui/core/CircularProgress'

const Home = () => {
  const [lists, setLists] = useState(null)

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
      <Grid key={list.listId} item md={4} sm={8} xs={12}>
        <List key={list.listId} list={list} />
      </Grid>
    ))
  ) : (
    <CircularProgress size={100} />
  )

  return (
    <div style={{flex: 1}}>
      <Grid container spacing={8} style={{ marginTop: 150, marginLeft: 0 }}>
        <Grid container sm={9} xs={12} spacing={3}>
          {recentLists}
        </Grid>
        <Grid item sm={3} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
