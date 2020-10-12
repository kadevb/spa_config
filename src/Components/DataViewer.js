import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import { calcOptions } from '../store'

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'flex',
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
  handleSubmit,
  setFinishedItem,
}) {
  const classes = useStyles()

  const [currentItem, setCurrentItem] = useState(propItem)
  const [checked, setChecked] = useState(
    currentItem.enabled === 'true' || currentItem.enabled === 'TRUE'
  )
  const [finished, setFinished] = useState(done)

  useEffect(() => {
    setFinished(done)
    setCurrentItem({ ...currentItem, enabled: checked })
    if (done) setFinishedItem(currentItem)
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

  return (
    <>
      {currentItem.description ? (
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            multiline
            onChange={handleChange}
            defaultValue={currentItem.description}
          ></TextField>
        </FormControl>
      ) : null}

      <Grid className={classes.root} container justify="space-between">
        <Grid item xs={5}>
          <FormControlLabel
            control={
              <Switch id="enabled" checked={checked} onChange={toggleChecked} />
            }
            label="Enabled"
            labelPlacement="start"
          />
        </Grid>
        <Grid item xs={7}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="calculation">Calculation</InputLabel>
            <Select
              native
              id="calculation"
              className="selectInput"
              onChange={handleChange}
              label="Calculation"
              value={currentItem.calculation}
            >
              <option aria-label="None" value="" />
              {calcOptions.map((calcOpt, index) => (
                <option key={index} value={index}>
                  {index + ' - ' + calcOpt}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid
        container
        className={classes.root}
        spacing={2}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              id="weight"
              label="Weight"
              variant="outlined"
              defaultValue={currentItem.weight}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6} className={classes.gridItem}>
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              id="targetValue"
              label="Target Value"
              variant="outlined"
              defaultValue={currentItem.targetValue}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}