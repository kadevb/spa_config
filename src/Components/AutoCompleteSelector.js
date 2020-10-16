/* eslint-disable no-use-before-define */
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Fade from '@material-ui/core/Fade'

export default function AutoCompleteSelector({
  rowSelector,
  rowKey,
  handleItemSelect,
  disabled,
  selectedItem,
}) {
  const handleInputChange = (e, value) => {
    handleItemSelect(value)
  }

  const label = 'Chose item to edit'

  return (
    <Fade in={true} timeout={1200}>
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
