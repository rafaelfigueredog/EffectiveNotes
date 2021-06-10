import React from 'react'
import gamer from '../../assets/img/gamer.png'
import logoIcon from '../../assets/img/logo.png'
import { format } from 'date-fns'
import {Typography, makeStyles, AppBar, Toolbar, Avatar } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
    return {
        AppBar: {
            display: 'flex',
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

export default function Header() {
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
                <Typography variant='body1' color='textPrimary'className={classes.date}>
                    {format( new Date(),  'do MMMM Y')}
                </Typography>
                <Typography variant='body1' color='textPrimary' >
                    User
                </Typography>
                <Avatar src={gamer} alt="User"  className={classes.avatar}/>
            </Toolbar>
        </AppBar>
    )
}
