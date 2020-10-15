import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import { calcOptions } from '../store'

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'flex',
    marginBottom: 20,
    marginTop: 20,
  },

  enableControl: {
    marginBottom: 20,
    marginTop: 20,
  },

  selectInput: {
    margin: 10,
  },

  myPaper: {
    width: '80%',
    maxWidth: 800,
    paddingTop: 40,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    paddingBottom: 40,
  },

  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

export default function DataViewer({
  propItem,
  done,
  setFinalizedItem,
  disabled,
}) {
  const classes = useStyles()

  const [currentItem, setCurrentItem] = useState(propItem)
  const [checked, setChecked] = useState(
    currentItem.enabled === 'true' || currentItem.enabled === 'TRUE'
  )
  const isIp = require('is-ip')
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState('')

  useEffect(() => {
    if (currentItem.hasOwnProperty('enabled')) {
      setCurrentItem({ ...currentItem, enabled: checked })
    }
    if (done) setFinalizedItem(currentItem)
    console.log(currentItem)
  }, [checked, done])

  const toggleChecked = () => {
    setChecked((prev) => !prev)
  }

  const handleChange = (event) => {
    const key = event.target.getAttribute('id')
    currentItem[key] = event.target.value
    setCurrentItem({ ...currentItem })
  }

  const handleIPCheck = (event) => {
    if (isIp(event.target.value) === true) {
      setHelperText('')
      setError(false)
      handleChange(event)
    } else {
      setError(true)
      setHelperText('Please enter a valid IP address')
    }
  }

  return (
    <>
      {currentItem.hasOwnProperty('description') ? (
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            multiline
            onChange={handleChange}
            defaultValue={currentItem.description}
            disabled={disabled}
          ></TextField>
        </FormControl>
      ) : null}
      {currentItem.hasOwnProperty('ipAddress') ? (
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            error={error}
            id="ipAddress"
            label="IP Address"
            variant="outlined"
            onChange={handleIPCheck}
            defaultValue={currentItem.ipAddress}
            disabled={disabled}
            helperText={helperText}
          ></TextField>
        </FormControl>
      ) : null}
      {currentItem.hasOwnProperty('parentCategoryId') ? (
        <Grid item>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="parentCategoryID">
              Parent Category ID
            </InputLabel>
            <Select
              native
              id="parentCategoryID"
              className="selectInput"
              onChange={handleChange}
              label="Parent Category ID"
              value={currentItem.parentCategoryId}
              disabled={disabled}
            >
              {calcOptions.map((calcOpt, index) => (
                <option key={index} value={index}>
                  {index + ' - ' + calcOpt}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
      ) : null}
      <Grid className={classes.root} container justify="space-between">
        {currentItem.hasOwnProperty('enabled') ? (
          <Grid item xs={5}>
            <FormControlLabel
              className={classes.enableControl}
              control={
                <Switch
                  id="enabled"
                  checked={checked}
                  onChange={toggleChecked}
                  disabled={disabled}
                />
              }
              label="Enabled"
              labelPlacement="start"
            />
          </Grid>
        ) : null}
        {currentItem.hasOwnProperty('calculation') ? (
          <Grid item xs={7}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="calculation">Calculation</InputLabel>
              <Select
                native
                id="calculation"
                className="selectInput"
                onChange={handleChange}
                label="Calculation"
                value={currentItem.calculation}
                disabled={disabled}
              >
                {calcOptions.map((calcOpt, index) => (
                  <option key={index} value={index}>
                    {index + ' - ' + calcOpt}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ) : null}
      </Grid>

      <Grid
        container
        className={classes.root}
        spacing={2}
        justify="center"
        alignItems="center"
      >
        {currentItem.hasOwnProperty('weight') ? (
          <Grid item xs={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                id="weight"
                label="Weight"
                variant="outlined"
                defaultValue={currentItem.weight}
                onChange={handleChange}
                disabled={disabled}
              />
            </FormControl>
          </Grid>
        ) : null}

        {currentItem.hasOwnProperty('targetValue') ? (
          <Grid item xs={6} className={classes.gridItem}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                id="targetValue"
                label="Target Value"
                variant="outlined"
                defaultValue={currentItem.targetValue}
                onChange={handleChange}
                disabled={disabled}
              />
            </FormControl>
          </Grid>
        ) : null}
      </Grid>
    </>
  )
}
