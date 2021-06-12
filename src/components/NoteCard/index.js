import { Card, CardHeader, CardContent, IconButton, Typography, makeStyles, Box } from '@material-ui/core';
import React,  {useState, useEffect} from 'react'
import { AiFillDelete } from 'react-icons/ai'
import PaletteIcon from '@material-ui/icons/Palette';
import PopoverColors from '../PopoverColors';

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
