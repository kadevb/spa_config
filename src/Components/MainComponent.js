import React, { useState, useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import HorizontalStepper from './Stepper'
import { csv } from 'd3'
import { dataOptions } from '../store'
import DropDownSelector from './DropDownSelector'
import AutoCompleteSelector from './AutoCompleteSelector'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import DataViewer from './DataViewer'
import AddButton from './AddButton'
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'
import sPAContext from './SharedFileWithContext'

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'flex',
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(1),
  },

  myPaper: {
    width: '80%',
    minWidth: 300,
    maxWidth: 800,
    paddingTop: '5vh',
    paddingBottom: '5vh',
    minHeight: 300,
    margin: 'auto',
    height: 'auto',
    transition: 'height 2s ease-in 2s',
  },
}))

export default function MainComponent() {
  const classes = useStyles()

  /* FRESH FROM THE BEGINNING */
  const [source, setSource] = useState(null)
  const [rowSelector, setRowSelector] = useState(null)
  const [rowKey, setRowKey] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [done, setDone] = useState(false)
  const [selectedSource, setSelectedSource] = useState('')
  const [sameIDArray, setSameIDArray] = useState([])

  const resetFormState = () => {
    setSource(null)
    setRowSelector(null)
    setRowKey(null)
    setSelectedItem(null)
    setCurrentItem(null)
    setActiveStep(0)
    setDone(false)
    setSelectedSource('')
  }

  const value = useMemo(
    () => ({
      setSource,
      setSelectedItem,
      setDone,
    }),
    []
  )

  //handle stepper
  const stepperNextClicked = useCallback((selectedData) => {
    // loading data for source variable
    const handleSource = () => {
      csv(selectedData).then((data) => setRowSelector(data))
      setRowKey(
        dataOptions.find((dataOption) => dataOption.source === selectedData)
          .rowKey
      )
    }
    // loading data for dataviewer
    const handleItem = () => {
      setCurrentItem(selectedData)
    }

    typeof selectedData === 'string' ? handleSource() : handleItem()
  }, [])

  const stepperBackClicked = (currentStep) => {
    // 1st step :
    //currentStep === '1' ? setRowSelector(null)
    setCurrentItem(null)
    setSelectedItem(null)
  }

  const handleWeightEdit = (value) => {
    // name of ID column in csv file
    const idName = Object.keys(currentItem)[0]

    // value of ID  in csv file
    const idValue = Object.values(currentItem)[0]

    // current item string ID without last number
    const weightFilterSplit = Object.values(currentItem)[0].split(',')
    weightFilterSplit.pop()
    const weightFilter = weightFilterSplit.join()
    console.log(weightFilter)

    // array of all elements in csv which have the same starting ID symbols
    const sameParentItems = rowSelector.filter((row) =>
      row[idName].startsWith(weightFilter)
    )
    console.log(sameParentItems)

    // making the calculations
    const modWeight = (1 - value) / (sameParentItems.length - 1)
    console.log(modWeight.toFixed(3))

    // array with the other elements which have the same starting ID symbols
    const newarr = sameParentItems.filter((item) => item[idName] !== idValue)

    // modifying the above array
    newarr.forEach((item) => (item.weight = modWeight.toFixed(3)))
    console.log(newarr)
    setSameIDArray(newarr)
  }

  const handleCheckChange = () => {
    console.log('CHECKED')
  }

  const setFinalizedItem = (currentItem) => {
    setCurrentItem(currentItem)

    const newItem = currentItem
    const allItems = [...rowSelector]
    const oldItem = allItems.find(
      (item) => item[rowKey[0]] === newItem[rowKey[0]]
    )
    allItems.splice(allItems.indexOf(oldItem), 1, newItem)
    allItems.map(
      (obj) => sameIDArray.find((o) => o.idName === obj.idName) || obj
    )
    setRowSelector(allItems)
    console.log(allItems)
  }

  return (
    <sPAContext.Provider value={value}>
      <Paper elevation={3} className={classes.myPaper}>
        <Container maxWidth="sm">
          <Fade in={true} timeout={600}>
            <Typography variant="h3" gutterBottom>
              {'SPA'}
            </Typography>
          </Fade>
          <DropDownSelector
            selectedSource={selectedSource}
            options={dataOptions}
            label={'Source'}
            setSelectedSource={setSelectedSource}
            disabled={activeStep >= 1 ? true : false}
          />
          {rowSelector && activeStep >= 1 ? (
            <Grid container>
              <Grid item xs={10}>
                <AutoCompleteSelector
                  selectedItem={selectedItem}
                  rowSelector={rowSelector}
                  rowKey={rowKey}
                  disabled={activeStep >= 2 ? true : false}
                />
              </Grid>
              <Grid item xs={2}>
                <Grid container justify="center" alignContent="center">
                  <AddButton disabled={activeStep >= 2 ? true : false} />
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          {currentItem && activeStep >= 2 ? (
            <DataViewer
              handleCheckChange={handleCheckChange}
              handleWeightEdit={handleWeightEdit}
              propItem={currentItem}
              setFinalizedItem={setFinalizedItem}
              done={done}
              disabled={activeStep >= 3 ? true : false}
            />
          ) : null}
          <HorizontalStepper
            source={source}
            nextClicked={stepperNextClicked}
            selectedItem={selectedItem}
            stepperBackClicked={stepperBackClicked}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            resetFormState={resetFormState}
          />
        </Container>
      </Paper>
    </sPAContext.Provider>
  )
}
