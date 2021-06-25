import React from 'react'
import PopoverColors from '../PopoverColors';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core';
import { RiPaletteLine } from 'react-icons/ri'
import {RiDeleteBin2Line} from 'react-icons/ri'
import {BsKanban} from 'react-icons/bs'
import {FiPlay} from 'react-icons/fi'
import {MdDone} from 'react-icons/md'
import {RiArrowGoBackFill} from 'react-icons/ri'
import palette from './palette'

const useStyles = makeStyles((theme) => {
    return {
        card: {
            backgroundColor: (note) => theme.palette.type === 'light'? 
                                        note.color.light : 
                                        note.color.dark, 

            textDecoration: (note) => note.state === 3 ? 
                            'line-through' : null, 
        },  
        containerIcons: {
            display: 'flex',  
        },
    }
}); 


export default function NoteCard( {note, notes, setNotes} ) {

    const classes = useStyles(note)

    const handleToDelete = async (id) => {
        const updatedNotes = notes.filter(note => note.id !== id); 
        setNotes(updatedNotes); 
    
        // update de database
        await fetch('http://localhost:8000/notes/' + id, { method: 'DELETE' }) 
    }
  
  
    const handleToChangeState = (noteId, newState) => {
        const index = notes.findIndex(note => note.id === noteId); 
        const noteToUpdate = notes[index]; 
        noteToUpdate.state = newState;  
        const updateNotes = [...notes] 
        updateNotes[index] = noteToUpdate; 
        setNotes(updateNotes)
    }
    
    const handleUpdateNotesColor = async (noteId, indexColor) => {
        
        console.log(note)
        console.log(indexColor)
        console.log(palette)

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

        console.log(recolorNote)
        console.log(notes)
    
        updateNotes[index] = recolorNote
        setNotes(updateNotes)
        
    
        // update database;
        await fetch('http://localhost:8000/notes/' + noteId, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(recolorNote)
          }).then(response => response.JSON())
            .then(data => {
              console.log('Success:', data)
            }).catch( (error) => {
              console.error(error)
        })
    }

    const selectColor = (idColor) => {
        handleUpdateNotesColor(note.id, idColor); 
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
            {
                note.details && 
                <CardContent  >
                    <Typography variant='body2'>
                        {note.details}
                    </Typography>
                </CardContent>
            }
            <CardContent className={classes.containerIcons} >
                <PopoverColors  icon={<RiPaletteLine title='Select color'/>} palette={palette} selectColor={selectColor}  />
                <IconButton  onClick={() => handleToDelete(note.id)} >
                    <RiDeleteBin2Line  title='Delete note' />
                </IconButton>
                {
                    note.state > 0 && 
                    <IconButton onClick={() => handleToChangeState(note.id, note.state - 1)}    >
                        <RiArrowGoBackFill title='Back'/>
                    </IconButton>
                }
                {
                    note.state === 0 &&  
                    <IconButton  onClick={() => handleToChangeState(note.id, 1)}>
                        <BsKanban title='Add todo list'/>
                    </IconButton>
                }
                {
                    note.state === 1 && 
                    <IconButton onClick={() => handleToChangeState(note.id, 2)} >
                        <FiPlay title='Get started'/>
                    </IconButton>
                }
                {
                    note.state === 2 && 
                    <IconButton onClick={() => handleToChangeState(note.id, 3)} >
                        <MdDone title='Done' />
                    </IconButton>
                }
            </CardContent>
       </Card>
    )
}
