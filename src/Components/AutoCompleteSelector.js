/* eslint-disable no-use-before-define */
import React, { useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Fade from '@material-ui/core/Fade'
import sPAContext from './SharedFileWithContext'

export default function AutoCompleteSelector({
  rowSelector,
  rowKey,
  disabled,
}) {
  const { setSelectedItem } = useContext(sPAContext)

  const handleInputChange = (e, value) => {
    setSelectedItem(value)
  }

  const label = 'Chose item to edit'

  return (
    <Fade in={true} timeout={600}>
      <Autocomplete
        id="rowSelector"
        disabled={disabled}
        options={rowSelector}
        getOptionSelected={(rowSelector) => rowSelector[rowKey[1]]}
        getOptionLabel={(rowSelector) =>
          rowSelector[rowKey[0]] + ' - ' + rowSelector[rowKey[1]]
        }
        renderOption={(rowSelector) =>
          rowSelector[rowKey[0]] + ' - ' + rowSelector[rowKey[1]]
        }
        onChange={handleInputChange}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
      />
    </Fade>
  )
}
