import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setNameFilter } from '../../redux/filters/slice'
import { selectNameFilter } from '../../redux/filters/selectors'

export const SearchBox = () => {
  const dispatch = useDispatch()
  const value = useSelector(selectNameFilter)

  return (
    <TextField
      fullWidth
      label="Find contacts by name or number"
      onChange={(event) => dispatch(setNameFilter(event.target.value))}
      slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> } }}
      value={value}
    />
  )
}
