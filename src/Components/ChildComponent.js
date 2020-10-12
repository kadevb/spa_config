import React, { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { SharedFileWithContext } from './SharedFileWithContext'
import Paper from '@material-ui/core/Paper'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import SourceSelector from './DropDownSelector'
import HorizontalLabelPositionBelowStepper from './Navigation'

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

export default function ChildComponent() {
  //Shared Context between Main and CHild components - file data
  const fileFromParent = useContext(SharedFileWithContext)
  const [file, setFile] = useState(fileFromParent.recivedFile)

  const classes = useStyles()

  //Choose SubControl
  const [subOptions, setSubOptions] = useState([])
  //Check if field "Enable" is true or false
  const [checked, setChecked] = useState(false)
  //Description field
  const [description, setDescription] = useState('')

  //recieving file from parent and setFile to file
  useEffect(() => {
    setFile(fileFromParent.recivedFile)
    setDescription('')
    setSubOptions([])
  }, [fileFromParent])

  //Setting options for SubControl
  useEffect(() => {
    let subOpt =
      file !== undefined
        ? Array.from(file).map((el) => {
            return [el.name]
          })
        : []
    setSubOptions(subOpt)
  }, [file])

  {
    /*el.subControlId + ' - ' + */
  }

  const toggleChecked = () => {}
  //Onchange of Sub Control dropdown options, extract all data from file and pass it to fields
  const handleOptChange = (event) => {
    //Get the selected row from file
    let selectedRow = Array.from(file).filter((rowToSelect) => {
      return rowToSelect.name === event.target.value
    })
    console.log(selectedRow)

    let descriptionFromFile = selectedRow.map((el) => {
      return el.description
    })
    descriptionFromFile === ''
      ? setDescription('')
      : setDescription(descriptionFromFile)

    let isEnable = selectedRow.map((el) => {
      return el.enabled
    })
    setChecked(isEnable[0] === 'true' ? true : false)
    //Since every file has different fields and values, you can create a functionality to create dynamic fields. For each key:value pair create a field with label "key from obj" and value "value from obj".
  }

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="input-subcontrol">Choose Sub-Control</InputLabel>
        <Select
          className="selectInput"
          native
          value={subOptions.age}
          onChange={handleOptChange}
          inputProps={{
            name: 'subcontrol',
            id: 'input-subcontrol',
          }}
        >
          <option aria-label="None" value="" />
          {subOptions.map((element, i) => (
            <option key={i} value={element}>
              {element}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          multiline
          value={description}
        ></TextField>
      </FormControl>

      <Grid className={classes.root} container justify="space-between">
        <Grid item xs={5}>
          <FormControlLabel
            control={<Switch checked={checked} onChange={toggleChecked} />}
            label="Enabled"
            labelPlacement="start"
          />
        </Grid>
        <Grid item xs={7}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="input-calculation">Calculation</InputLabel>
            <Select
              className="selectInput"
              native
              value={subOptions.age}
              defaultValue={0}
              inputProps={{
                name: '',
                id: 'input-calculation',
              }}
            >
              <option value={0}>0 - Automatic</option>
              <option value={1}>1 - Not Implemented</option>
              <option value={2}>2 - Partially Implemented</option>
              <option value={3}>3 - Fully Implemented on Some systems</option>
              <option value={4}>4 - Fully Implemented on Most systems</option>
              <option value={5}>5 - Fully Implemented on All systems</option>
              <option value={6}>6 - Not yet monitored</option>
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
              id="outlined-basic"
              label="Weight"
              variant="outlined"
              defaultValue="0.125"
            />
          </FormControl>
        </Grid>

        <Grid item xs={6} className={classes.gridItem}>
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              id="outlined-basic"
              label="Target Value"
              variant="outlined"
              defaultValue="0.74"
            ></TextField>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  )
}
