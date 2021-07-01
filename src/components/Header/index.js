import React from 'react'
import logoIcon from '../../assets/img/logo.png'
import { Typography, makeStyles, AppBar, Toolbar, IconButton, Button } from '@material-ui/core'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import {BsLightning} from 'react-icons/bs'; 
import {BsKanban} from 'react-icons/bs';
import {Badge} from '@material-ui/core'; 
import ToolTip from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme) => {
    return {
        AppBar: {
            display: 'flex',
            backgroundColor: theme.palette.background.default, 
        },
        date: {
            flexGrow: 1, 
            marginLeft: theme.spacing(2)
        },
        avatar: {
            margin: theme.spacing(2), 
        }, 
        img: {
            width: theme.spacing(5)
        }, 
        toolbar: theme.mixins.toolbar, 
        
        activeIcon: {
            color: theme.palette.type === 'dark' ?
                   theme.palette.primary.main :
                   theme.palette.secondary.main 
        }, 
        mode: {
            marginLeft: theme.spacing(2), 
            color: theme.palette.type === 'dark' ?
                   theme.palette.primary.main :
                   theme.palette.secondary.main 
        },
    }
})

export default function Header( {paletteType, setPaletteType, mode, setMode, onKanban} ) {
    const classes = useStyles(); 

    const handleToProductive = () => {
        setMode(1); 
        localStorage.setItem('mode', JSON.stringify(1)); 
    }

    const handleToBrainstorming = () => {
        localStorage.setItem('mode', JSON.stringify(0)); 
        setMode(0); 
    }
    
    return (
        <AppBar className={classes.AppBar} elevation={0} >
            <Toolbar>
                <img src={logoIcon} className={classes.img} alt='logo'/>
                <Typography variant='h6' color='textSecondary'className={classes.date}>
                    Effective
                    <span> 
                        <Typography> Notes </Typography>
                    </span>
                </Typography>  
           
                <ToolTip title={!paletteType? 'light theme' : 'dark theme'} >
                    <IconButton onClick={() => setPaletteType(!paletteType)} >
                        { paletteType?  <Brightness4Icon /> : <Brightness7Icon /> }
                    </IconButton>
                </ToolTip>

                <ToolTip title='Productive'>
                    <IconButton onClick={() => handleToProductive()}  >
                        <Badge color={paletteType? 'secondary' : 'primary' } badgeContent={onKanban}>
                            <BsKanban className={ mode? classes.activeIcon : null }/>
                        </Badge>
                    </IconButton> 
                </ToolTip>  

                <ToolTip title='Brainstorming'>
                    <IconButton onClick={() => handleToBrainstorming()} >
                        <BsLightning className={ !mode? classes.activeIcon : null }/>
                    </IconButton>
                </ToolTip>                    
            </Toolbar>
        </AppBar>
    )
}
