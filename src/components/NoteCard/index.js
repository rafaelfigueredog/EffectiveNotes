import React from 'react'

import Card from '@material-ui/core/Card'
import makeStyles from '@material-ui/styles/makeStyles';

import palette from './components/Palette'
import NoteHeader from './components/NoteHeader'
import NoteContent from './components/NoteContent'
import NoteActions from './components/NoteActions'


const useStyles = makeStyles((theme) => {
    return {
        card: {
            backgroundColor: (note) => theme.palette.type === 'light'? 
                                        note.color.light : 
                                        note.color.dark, 
            width: 300, 
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
    
    const handleUpdateNotesColor = (noteId, indexColor) => {
        
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
            <NoteHeader title={note.title} /> 
            <NoteContent content={note.details} />
            <NoteActions 
                note={note} 
                language={language}
                onPalette={selectColor}
                onDelete={handleToDelete}
                onChangeState={handleToChangeState}
            />
       </Card>
    )
}
