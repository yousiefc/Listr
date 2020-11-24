import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { useTheme } from '@material-ui/core/styles'
import MyButton from './MyButton'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'

const SearchDiv = () => {
  const theme = useTheme()
  const [search, setSearch] = useState('')

  return (
    <OuterDiv theme={theme}>
      <form
        noValidate
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <ContainerGrid container justify='center'>
          <SearchBar
            theme={theme}
            variant='filled'
            placeholder='Find a list!'
            id='search'
            name='search'
            type='text'
            value={search}
            onChange={e => setSearch(e.target.value)}
            fullWidth
          />
          <SearchButton type='submit'>
            <SearchIcon />
          </SearchButton>
        </ContainerGrid>
      </form>
    </OuterDiv>
  )
}

//https://www.svgbackgrounds.com/#flat-mountains
const OuterDiv = styled.div`
  background-color: #a6e70d;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%238ec60c' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%2382b60b' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%238ec60c' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%2380b30b' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%238ec60c' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%237eaf0b' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%238ec60c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%237bac0a' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%238ec60c' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%2379a80a' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%238ec60c' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%2377a50a' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
  background-attachment: local;
  background-size: cover;
  background-position: 100% 80%;
  background-repeat: no-repeat;
  height: 240px;
  margin: 0;
  width: 100%;
  position: fixed;
  margin-top: -240px;
  z-index: 20;
`
const ContainerGrid = styled(Grid)`
  margin-top: 130px;
`

const SearchBar = styled(TextField)`
  max-width: 500px;
  min-width: 300px;

  & .MuiFilledInput-underline {
    background-color: #f6f6f6;
    font-size: 18px;
    border-radius: 8px;
  }

  & .MuiFilledInput-underline::before,
  & .MuiFilledInput-underline::after {
    border: none;
  }

  & .MuiFilledInput-input {
    padding: 15px;
  }
`

const SearchButton = styled(IconButton)`
  margin-left: 10px;
`

export default SearchDiv
