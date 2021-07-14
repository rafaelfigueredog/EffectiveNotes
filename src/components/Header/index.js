import React from 'react'

import makeStyles from '@material-ui/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Tooltip  from '@material-ui/core/Tooltip'
import AppBar  from '@material-ui/core/AppBar'
import Toolbar  from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

import {BsLightning} from 'react-icons/bs'; 
import {BsKanban} from 'react-icons/bs';
import {IoLanguageOutline} from 'react-icons/io5'

import logoIcon from '../../assets/img/logo.png'
import languages from '../../languages'

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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }
})



export default function Header( {paletteType, setPaletteType, mode, setMode, onKanban, language, setLanguage} ) {
    const classes = useStyles(); 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };  

    const handleSelect = (updateLanguage) => {
        setLanguage(languages[updateLanguage])
    }

    const handleToProductive = () => {  
        setMode(1); 
        localStorage.setItem('mode', JSON.stringify(1)); 
    }

    const handleToBrainstorming = () => {
        localStorage.setItem('mode', JSON.stringify(0)); 
        setMode(0); 
    }

    const LanguageMenu = () => {
        return (
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={() => handleClose()}
                TransitionComponent={Fade}
            >

                {language.header_actions.select_language.map((languageOption, index) => (
                    <MenuItem 
                        onClick={() => handleSelect(languageOption.value)}
                        key={index}
                    > 
                        {languageOption.name}
                    </MenuItem>
                ))}
            </Menu>
        ); 
    }

    return (
        <AppBar className={classes.AppBar} elevation={0} >
            <Toolbar>
                <img src={logoIcon} className={classes.img} alt='logo'/>
                <Typography variant='h6' color='textSecondary'className={classes.date}>
                    Effective
                    <span> 
                        <Typography > Notes </Typography>
                    </span>
                </Typography>  

                <Tooltip title={language.header_actions.language}>
                    <IconButton onClick={handleClick} aria-controls="fade-menu" aria-haspopup="true">
                        <IoLanguageOutline />
                    </IconButton>
                </Tooltip>
                <LanguageMenu />
           
                <Tooltip title={!paletteType? language.header_actions.light_theme : language.header_actions.dark_theme } >
                    <IconButton onClick={() => setPaletteType(!paletteType)} >
                        { paletteType?  <Brightness4Icon /> : <Brightness7Icon /> }
                    </IconButton>
                </Tooltip>

                <Tooltip title={language.header_actions.productive}>
                    <IconButton onClick={() => handleToProductive()}  >
                        <Badge color={paletteType? 'secondary' : 'primary' } badgeContent={onKanban}>
                            <BsKanban className={ mode? classes.activeIcon : null }/>
                        </Badge>
                    </IconButton> 
                </Tooltip>  

                <Tooltip title={language.header_actions.brainstorming}>
                    <IconButton onClick={() => handleToBrainstorming()} >
                        <BsLightning className={ !mode? classes.activeIcon : null }/>
                    </IconButton>
                </Tooltip>                    
            </Toolbar>
        </AppBar>
    )
}
