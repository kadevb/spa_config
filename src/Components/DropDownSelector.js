import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Fade from '@material-ui/core/Fade'
import sPAContext from './SharedFileWithContext'

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    display: 'flex',
    marginTop: 20,
    marginBottom: 20,
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export default function SourceSelector({
  options,
  label,
  disabled,
  selectedSource,
  setSelectedSource,
}) {
  const classes = useStyles()
  const { setSource } = useContext(sPAContext)
  const handleChange = (e) => {
    setSelectedSource(e.target.value)
    setSource(e.target.value)
  }

  return (
    <Fade in={true} timeout={600}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-source-select"> {label}</InputLabel>
        <Select
          native
          onChange={handleChange}
          label={label}
          disabled={disabled}
          value={selectedSource}
        >
          <option aria-label="None" value="" />
          {options.map((opt, index) => (
            <option key={index} value={opt.source}>
              {opt.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </Fade>
  )
}
