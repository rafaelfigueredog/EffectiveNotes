import React from 'react'
import PaletteIcon from '@material-ui/icons/Palette';
import PopoverColors from '../PopoverColors';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core';
import { AiFillDelete } from 'react-icons/ai'


const useStyles = makeStyles((theme) => {
    return {
        card: {
            backgroundColor: (note) => theme.palette.type === 'light'? 
                                        note.color.light : 
                                        note.color.dark, 
        },  
        containerIcons: {
            display: 'flex',  
        },
    }
}); 


export default function NoteCard( {note, handleToDelete, palette, updateNotesColor} ) {

    const classes = useStyles(note)

    const handleChangeColor = (id) => {
        updateNotesColor(note.id, id)
    }

    return (
       <Card elevation={3} className={classes.card} >
           <CardHeader className={classes.content} 
            title={ 
                <Typography variant='h6' noWrap={false} >
                    {note.title}
                </Typography>
            }
            subheader={
                <Typography variant="caption" >
                    {note.date}
                </Typography>
            }
            />
            <CardContent  >
                <Typography variant='body2'   >
                    {note.details}
                </Typography>
            </CardContent>

            <CardContent className={classes.containerIcons} >
                <PopoverColors  icon={<PaletteIcon />} palette={palette} changeColor={handleChangeColor}  />
                <IconButton  onClick={() => handleToDelete(note.id)} >
                    <AiFillDelete  />
                </IconButton>
            </CardContent>
       </Card>
    )
}
