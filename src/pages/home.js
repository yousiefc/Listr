import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import List from '../components/List'

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
    lists.lists.map(list => <List key={list.listId} list={list} />)
  ) : (
    <p>Loading...</p>
  )

  return (
    <Grid container spacing={4}>
      <Grid item sm={8} xs={12}>
        {recentLists}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile...</p>
      </Grid>
    </Grid>
  )
}

export default Home
