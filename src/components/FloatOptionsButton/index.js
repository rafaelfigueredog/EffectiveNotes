import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import {BsLightning} from 'react-icons/bs'; 
import {BsFileCheck} from 'react-icons/bs'

const useStyles = makeStyles((theme) => ({
    root: {
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    icons: {
        fontSize: 20, 
        color: theme.palette.type === 'light' ? 
               theme.palette.text.primary : 
               theme.palette.primary.main
    },
    activeIcon: {
        fontSize: 20, 
        color: theme.palette.type === 'light' ? 
               theme.palette.text.primary : 
               theme.palette.common.black
    }, 
    speedDialAction: {
        backgroundColor: theme.palette.primary.main
    }
}));



export default function OpenIconSpeedDial({mode, setMode}) {

   
    const classes = useStyles(mode);
    const [open, setOpen] = useState(false);
    
    const actions = [
        {
            id: 0, 
            icon: <BsLightning className={ mode ? classes.icons : classes.activeIcon } />, 
            name: 'Brainstorming'
        }, 
        {
            id: 1, 
            icon: <BsFileCheck className={mode ? classes.activeIcon : classes.icons } />, 
            name: 'Productive'
        }, 
    ]; 
    
    

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMode = (action) => {
        setMode(action.id)
    }
    

    return (
        <div className={classes.root}>
        <SpeedDial 
            ariaLabel="Edition Mode"
            className={classes.speedDial}
            hidden={false}
            icon={<SpeedDialIcon openIcon={<EditIcon />} icon={<MoreHorizIcon />} />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
        >
            {actions.map((action) => (
            <SpeedDialAction 
                className={mode === action.id? classes.speedDialAction : null }
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                onClick={() =>  handleMode(action) }
            />
            ))}
        </SpeedDial>    
        </div>
    );
}