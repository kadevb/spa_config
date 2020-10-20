import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Tooltip from '@material-ui/core/Tooltip'
import Fade from '@material-ui/core/Fade'

export default function AddButton({ disabled }) {
  const handleAddNew = () => {
    alert('modal will appear here')
  }
  return (
    <Fade in={true} timeout={600}>
      <Tooltip title="Add new">
        <IconButton onClick={handleAddNew} disabled={disabled}>
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
    </Fade>
  )
}
