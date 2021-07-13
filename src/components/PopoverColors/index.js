import React from 'react';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import {RiCheckboxBlankCircleFill, RiCheckboxCircleFill} from 'react-icons/ri'

const useStyles = makeStyles(theme => {
  return {
    icon: {
      width: theme.spacing(2.5), 
    },
    container: {
      display: 'block',
      width: 230
    }
  }
})

export default function PopoverColors( {icon, palette, selectColor, noteColor, language} ) {
  const classes = useStyles(); 
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div >
          <Tooltip title={language.note_actions.change_color} placement='bottom-start' >
            <IconButton variant="contained" {...bindTrigger(popupState)} >
              {icon}
            </IconButton>
          </Tooltip>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {palette.map((color, index) => (
              <IconButton key={color.id} onClick={() => {selectColor(color.id)}}  >
                {
                  noteColor.id === color.id ? 
                    <RiCheckboxCircleFill className={classes.icon} color={ color.light }/>
                  : <RiCheckboxBlankCircleFill className={classes.icon} color={ color.light } />
                }
              </IconButton>
            ))} 
          </Popover>
        </div>
      )}
    </PopupState>
  );
}