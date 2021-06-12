import React from 'react'
import gamer from '../../assets/img/gamer.png'
import logoIcon from '../../assets/img/logo.png'
import { format } from 'date-fns'
import { Typography, makeStyles, AppBar, Toolbar, Avatar, IconButton } from '@material-ui/core'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'

const useStyles = makeStyles((theme) => {
    return {
        AppBar: {
            display: 'flex',
            backgroundColor: theme.palette.type === 'dark' ? '#424242' : '#fafafa' 
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
        toolbar: theme.mixins.toolbar
    }
})

export default function Header( {paletteType, setPaletteType} ) {
    const classes = useStyles(); 
    return (
        <AppBar className={classes.AppBar}>
            <Toolbar>
                <img src={logoIcon} className={classes.img} alt='logo'/>
                <Typography variant='h6' color='textSecondary'className={classes.date}>
                    Effective
                    <span> 
                        <Typography> Notes </Typography>
                    </span>
                </Typography>
                <Typography variant='body1' color='textSecondary' className={classes.date}>
                    {format( new Date(),  'do MMMM Y')}
                </Typography>
                    
                <IconButton onClick={() => setPaletteType(!paletteType)}>
                    { paletteType? <Brightness4Icon/> : <Brightness7Icon /> }
                </IconButton>
                
                <Typography variant='body2' color='textSecondary'>
                    Bem-vindo <br/> 
                    <span>  
                        <Typography variant='caption' aling='left' >
                            user 
                        </Typography>
                    </span>
                </Typography>
                <Avatar src={gamer} alt="User"  className={classes.avatar}/>
            </Toolbar>
        </AppBar>
    )
}
