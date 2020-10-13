import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

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
  handleButton,
  options,
  label,
  disabled,
  selectedSource,
  setSelectedSource,
}) {
  const classes = useStyles()

  const handleChange = (e) => {
    setSelectedSource(e.target.value)
    handleButton(e.target.value)
  }

  return (
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
  )
}
