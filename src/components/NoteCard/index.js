import React from 'react'
import PopoverColors from '../PopoverColors';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core';
import {RiPaletteLine} from 'react-icons/ri'
import {RiDeleteBin2Line} from 'react-icons/ri'
import {BsKanban} from 'react-icons/bs'
import {BsCheckCircle} from 'react-icons/bs'
import {Tooltip} from '@material-ui/core';
import palette from './palette'


const useStyles = makeStyles((theme) => {
    return {
        card: {
            backgroundColor: (note) => theme.palette.type === 'light'? 
                                        note.color.light : 
                                        note.color.dark, 
            width: 300, 
        },  
        containerIcons: {
            display: 'flex',  
        },
        iconDone: {
            color: theme.palette.type === 'light'? 
                   theme.palette.text.secondary : 
                   theme.palette.text.primary 
            
        }
    }
}); 


export default function NoteCard({note, notes, setNotes, onKanban, setOnKanban, language}) {

    const classes = useStyles(note)

    const handleToDelete = async (id) => {
        const updatedNotes = notes.filter(note => note.id !== id); 
        setNotes(updatedNotes); 
    
        /* Local Storage */
        localStorage.setItem("notes", JSON.stringify(updatedNotes)); 
    }
  
  
    const handleToChangeState = (noteId, newState) => {
        const index = notes.findIndex(note => note.id === noteId); 
        const noteToUpdate = notes[index]; 
        noteToUpdate.state = newState;  
        const updateNotes = [...notes] 
        updateNotes[index] = noteToUpdate; 
        setNotes(updateNotes)
        setOnKanban((onKanban + 1)); 
        
        
        /* Local Storage */
        localStorage.setItem("onKanban", JSON.stringify(onKanban+1)); 
        localStorage.setItem("notes", JSON.stringify(updateNotes)); 
    }
    
    const handleUpdateNotesColor = async (noteId, indexColor) => {
        
        const index = notes.findIndex(note => note.id === noteId); 
        const { id, title, date, details, state } = notes[index];  
        const colorObject = palette[indexColor]
        const color = colorObject
        const updateNotes = [...notes] 
    
        const recolorNote = {
          id, 
          title, 
          date, 
          details, 
          color, 
          state, 
        }
    
        updateNotes[index] = recolorNote
        setNotes(updateNotes)
        
        /* Local Storage */
        localStorage.setItem('notes', JSON.stringify(notes)); 
    }

    const selectColor = (idColor) => {
        handleUpdateNotesColor(note.id, idColor); 
    }

    return (
       <Card elevation={3} className={classes.card} >
           <CardHeader className={classes.content} 
            title={ 
                <Typography variant='h6' noWrap={false}>
                    {note.title}
                </Typography>
            }
            subheader={
                <Typography variant="caption" >
                    {note.date}
                </Typography>
            }
            action={
                (note.state === 3) && 
                <IconButton disabled >
                    <BsCheckCircle className={classes.iconDone} />
                </IconButton>
            }
            />
            {
                note.details && 
                <CardContent  >
                    <Typography variant='body2'>
                        {note.details}
                    </Typography>
                </CardContent>
            }
            <CardContent className={classes.containerIcons} >
                
                <PopoverColors  
                    icon={<RiPaletteLine />} 
                    palette={palette} 
                    selectColor={selectColor} 
                    noteColor={note.color} 
                    language={language} 
                />
               
                <Tooltip title={language.note_actions.delete} placement='bottom-start' >
                    <IconButton  onClick={() => handleToDelete(note.id)} >
                        <RiDeleteBin2Line />
                    </IconButton>
                </Tooltip>

                {
                    note.state === 0 &&  
                    <Tooltip title={language.note_actions.add_todo} placement='bottom-start' >
                        <IconButton  onClick={() => handleToChangeState(note.id, 1)}>
                            <BsKanban />
                        </IconButton>
                    </Tooltip>
                }   
            </CardContent>
       </Card>
    )
}
