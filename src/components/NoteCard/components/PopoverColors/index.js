import React from 'react';

import Popover from '@material-ui/core/Popover';
import IconButton  from '@material-ui/core/IconButton';
import makeStyles  from '@material-ui/styles/makeStyles';
import Tooltip  from '@material-ui/core/Tooltip';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import {RiCheckboxBlankCircleFill} from 'react-icons/ri'
import {RiCheckboxCircleFill} from 'react-icons/ri'

import palette from '../Palette'

const useStyles = makeStyles(theme => {
  return {
    icon: {
      width: theme.spacing(3), 
    },
  }
})

export default function PopoverColors( {icon, selectColor, noteColor, language} ) {
  const classes = useStyles(); 
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div >
          <Tooltip title={language.note_actions.change_color} placement='bottom-start' >
            <IconButton  {...bindTrigger(popupState)} >
              {icon}
            </IconButton>
          </Tooltip>
          <Popover className={classes.container}
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