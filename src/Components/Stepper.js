import React, { useEffect, useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import AlertDialog from './Modal'
import Fade from '@material-ui/core/Fade'
import sPAContext from './SharedFileWithContext'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontWeight: 300,
    fontStyle: 'italic',
  },
}))

function getSteps() {
  return ['Select data source', 'Chose item', 'Edit data']
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select source'
    case 1:
      return 'Chose item  to edit'
    case 2:
      return 'Edit the appropriate data'
    default:
      return 'Your data has been saved successfully'
  }
}

export default function HorizontalStepper({
  source,
  nextClicked,
  selectedItem,
  stepperBackClicked,
  activeStep,
  setActiveStep,
  resetFormState,
  handleClickOpen,
}) {
  const classes = useStyles()
  const steps = getSteps()

  const [nextDisabled, setNextDisabled] = useState(true)
  const { setDone } = useContext(sPAContext)

  useEffect(() => {
    if (!source) {
      setNextDisabled(true)
    } else if (source && activeStep === 0) {
      setNextDisabled(false)
    } else if (source && !selectedItem && activeStep === 1) {
      setNextDisabled(true)
    } else if (source && selectedItem && activeStep === 1) {
      setNextDisabled(false)
    }

    //step 1, load row selector for file
    if (activeStep === 1 && source) {
      nextClicked(source)
    } else if (activeStep === 2) {
      //step 2, load data viewer for row
      nextClicked(selectedItem)
    } else if (activeStep === 3) {
      setDone(true)
    }
  }, [activeStep, nextClicked, selectedItem, source, nextDisabled])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    stepperBackClicked(activeStep)
  }

  const handleReset = () => {
    setActiveStep(0)
    resetFormState()
  }

  return (
    <Fade in={true} timeout={600}>
      <div className={classes.root}>
        <Typography className={classes.instructions}>
          {getStepContent(activeStep)}
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <Grid container justify="center">
              <Grid item>
                <Button
                  onClick={handleReset}
                  color="secondary"
                  variant="contained"
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          ) : (
            <div>
              <div>
                <Grid
                  container
                  className={classes.root}
                  spacing={2}
                  justify="space-evenly"
                  alignItems="center"
                >
                  <Grid item xs={2} className={classes.gridItem}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>
                  </Grid>
                  <Grid item xs={2} className={classes.gridItem}>
                    {activeStep !== steps.length - 1 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={nextDisabled}
                        onClick={handleNext}
                      >
                        {'Next'}
                      </Button>
                    ) : (
                      <AlertDialog
                        onClick={handleClickOpen}
                        handleNext={handleNext}
                      />
                    )}
                  </Grid>
                </Grid>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fade>
  )
}
