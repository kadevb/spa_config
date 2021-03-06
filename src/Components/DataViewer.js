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
import Fade from '@material-ui/core/Fade'
import { csv } from 'd3'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

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

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f50057',
      color: 'white',
      boxShadow: theme.shadows[1],
      fontSize: 12,
    },
  }))(Tooltip)

  const [currentItem, setCurrentItem] = useState(propItem)
  const [checked, setChecked] = useState(
    currentItem.enabled === 'true' || currentItem.enabled === 'TRUE'
      ? true
      : false
  )
  const isIp = require('is-ip')
  const [ipError, setIpError] = useState(false)
  const [ipHelperText, setIpHelperText] = useState(' ')
  const [targetHelperText, setTargetHelperText] = useState(' ')
  const [targetError, setTargetError] = useState(false)
  const [parentData, setParentData] = useState([])
  const [weightError, setWeightError] = useState(false)
  const [weightHelperText, setWeightHelperText] = useState(' ')

  useEffect(() => {
    if (currentItem.hasOwnProperty('enabled')) {
      setCurrentItem({ ...currentItem, enabled: checked })
    }
    if (done) setFinalizedItem(currentItem)

    if (currentItem.hasOwnProperty('parentCategoryId')) {
      csv('./lookups/spa_mainCategories.csv').then((d) => {
        setParentData(d)
      })
    }
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
      setIpHelperText(' ')
      setIpError(false)
      handleChange(event)
    } else {
      setIpError(true)
      setIpHelperText('Please enter a valid IP address')
    }
  }

  const countDecimal = (someValue) => {
    if (someValue % 1 !== 0) {
      return someValue.split('.')[1].length
    }
  }

  const handleTargetChange = (event) => {
    const tValue = Number(event.target.value).toFixed(2)

    if (tValue <= 0) {
      setTargetHelperText('Target Value must be greater than 0')
      setTargetError(true)
    } else if (tValue > 1) {
      setTargetHelperText('Target Value must be less than 1')
      setTargetError(true)
    } else if (isNaN(tValue)) {
      setTargetHelperText('Value must be a number with 2 decimals')
      setTargetError(true)
    } else if (countDecimal(event.target.value) > 2) {
      setTargetHelperText('Value must be a number with 2 decimals')
      setTargetError(true)
    } else {
      setTargetError(false)
      setTargetHelperText(' ')
      handleChange(event)
    }
    return tValue
  }

  const handleWeightChange = (event) => {
    const weightN = Number(event.target.value).toFixed(3)

    if (weightN <= 0) {
      setWeightError(true)
      setWeightHelperText('Weight must be greater than 0')
    } else if (weightN > 1) {
      setWeightError(true)
      setWeightHelperText('Weight must be less than 1')
    } else if (isNaN(weightN)) {
      setWeightError(true)
      setWeightHelperText('Weight must be a number with 3 decimals')
    } else if (countDecimal(event.target.value) > 3) {
      setWeightError(true)
      setWeightHelperText('Weight must be a number with 3 decimals')
    } else {
      setWeightError(true)
      setWeightHelperText('Changing Weight will affect other items!')
      handleChange(event)
    }
  }

  return (
    <>
      {currentItem.hasOwnProperty('description') ? (
        <Fade in={true} timeout={600}>
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
        </Fade>
      ) : null}
      {currentItem.hasOwnProperty('ipAddress') ? (
        <Fade in={true} timeout={600}>
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              error={ipError}
              id="ipAddress"
              label="IP Address"
              variant="outlined"
              onChange={handleIPCheck}
              defaultValue={currentItem.ipAddress}
              disabled={disabled}
              helperText={ipHelperText}
            ></TextField>
          </FormControl>
        </Fade>
      ) : null}
      {currentItem.hasOwnProperty('parentCategoryId') ? (
        <Fade in={true} timeout={800}>
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
                {parentData.map((parent, index) => (
                  <option key={index} value={index + 1}>
                    {parent.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Fade>
      ) : null}
      <Grid className={classes.root} container justify="space-between">
        {currentItem.hasOwnProperty('enabled') ? (
          <Fade in={true} timeout={1000}>
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
          </Fade>
        ) : null}
        {currentItem.hasOwnProperty('calculation') ? (
          <Fade in={true} timeout={1200}>
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
          </Fade>
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
          <Fade in={true} timeout={1400}>
            <Grid item xs={6}>
              <LightTooltip
                arrow
                title="Changing Weight may cause issues."
                aria-label="weight"
                placement="top"
                color="secondary"
              >
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="weight"
                    label="Weight"
                    variant="outlined"
                    defaultValue={currentItem.weight}
                    onChange={handleWeightChange}
                    helperText={weightHelperText}
                    error={weightError}
                    disabled={disabled}
                  />
                </FormControl>
              </LightTooltip>
            </Grid>
          </Fade>
        ) : null}

        {currentItem.hasOwnProperty('targetValue') ? (
          <Fade in={true} timeout={1600}>
            <Grid item xs={6} className={classes.gridItem}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  id="targetValue"
                  label="Target Value"
                  variant="outlined"
                  defaultValue={currentItem.targetValue}
                  onChange={handleTargetChange}
                  disabled={disabled}
                  helperText={targetHelperText}
                  error={targetError}
                />
              </FormControl>
            </Grid>
          </Fade>
        ) : null}
      </Grid>
    </>
  )
}
