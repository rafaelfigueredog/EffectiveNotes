import React from 'react';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { IconButton, Grid, makeStyles } from '@material-ui/core';
import { FaCircle } from 'react-icons/fa'


const useStyles = makeStyles(theme => {
  return {
    icon: {
      width: theme.spacing(2)
    }
  }
})

export default function PopoverColors( {icon, palette, changeColor} ) {

  const classes = useStyles(); 

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton variant="contained" color="inherit" {...bindTrigger(popupState)} >
            {icon}
          </IconButton>
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
          
              
            {palette.map(color => (
              <IconButton key={color.id} onClick={() => {changeColor(color.id)}} >
                <FaCircle className={classes.icon} color={ color.value }> </FaCircle>
              </IconButton>
            ))} 

          </Popover>
        </div>
      )}
    </PopupState>
  );
}