import React, { useState, useEffect, useCallback } from 'react'
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

  useEffect(() => {}, [])

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

  //handle source selection
  const handleButton = (source) => {
    setSource(source)
  }

  const handleItemSelect = (selectedItem) => {
    setSelectedItem(selectedItem)
  }

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

  const isDone = () => {
    setDone(true)
  }

  const setFinalizedItem = (currentItem) => {
    setCurrentItem(currentItem)

    const newItem = currentItem
    const allItems = [...rowSelector]
    const oldItem = allItems.find(
      (item) => item[rowKey[0]] === newItem[rowKey[0]]
    )
    allItems.splice(allItems.indexOf(oldItem), 1, newItem)
    setRowSelector(allItems)
  }

  return (
    <>
      <Paper elevation={3} className={classes.myPaper}>
        <Container maxWidth="sm">
          <Fade in={true} timeout={600}>
            <Typography variant="h3" gutterBottom>
              {'SPA'}
            </Typography>
          </Fade>
          <DropDownSelector
            handleButton={handleButton}
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
                  handleItemSelect={handleItemSelect}
                  disabled={activeStep >= 2 ? true : false}
                />
              </Grid>
              <Grid container xs={2} justify="center" alignContent="center">
                <AddButton disabled={activeStep >= 2 ? true : false} />
              </Grid>
            </Grid>
          ) : null}
          {currentItem && activeStep >= 2 ? (
            <DataViewer
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
            isDone={isDone}
            resetFormState={resetFormState}
          />
        </Container>
      </Paper>
    </>
  )
}
