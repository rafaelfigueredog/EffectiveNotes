import React from 'react'
import logoIcon from '../../assets/img/logo.png'
import { Typography, makeStyles, AppBar, Toolbar, IconButton, Button } from '@material-ui/core'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import {BsLightning} from 'react-icons/bs'; 
import {BsKanban} from 'react-icons/bs';
import {Badge} from '@material-ui/core'; 

const useStyles = makeStyles((theme) => {
    return {
        AppBar: {
            display: 'flex',
            backgroundColor: theme.palette.type === 'dark' ? '#303030' : '#fafafa' 
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
                
           
                <IconButton onClick={() => setPaletteType(!paletteType)} title='theme' >
                    { paletteType?  <Brightness4Icon /> : <Brightness7Icon /> }
                </IconButton>

                <IconButton onClick={() => setMode(1)} title='Productive' >
                    <Badge color={paletteType? 'secondary' : 'primary' } badgeContent={onKanban}>
                        <BsKanban className={ mode? classes.activeIcon : null }/>
                    </Badge>
                </IconButton> 

                 <IconButton onClick={() => setMode(0)}  title='Brainstorming' >
                    <BsLightning className={ !mode? classes.activeIcon : null }/>
                </IconButton>                    

                <Typography className={classes.mode} >
                   { mode? 'Productive' : 'Brainstorming' }
                </Typography>
                
            </Toolbar>
        </AppBar>
    )
}
