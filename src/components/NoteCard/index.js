import React, {useState} from 'react'

import Card from '@material-ui/core/Card'
import makeStyles from '@material-ui/styles/makeStyles';

import palette from './components/Palette'
import NoteHeader from './components/NoteHeader'
import NoteContent from './components/NoteContent'
import NoteActions from './components/NoteActions'
import DataBaseService from '../../services/database';


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

    const [title, setTitle] = useState(note.title);
    const [details, setDetails] = useState(note.details);

    const dataBaseService = new DataBaseService(); 

    const updateDataBase = (note) => {
        const hashMap = new Map(notes); 
        hashMap.set(note.id, note); 
        setNotes(hashMap); 
        dataBaseService.update('notes', Array.from(hashMap.entries())); 
    }

    const handleToChangeState = (note, state) => {
        const hashMap = new Map(notes); 
        const noteUpdate = hashMap.get(note); 
        noteUpdate.state = state; 
        setNotes(hashMap); 
        setOnKanban(onKanban+1);
        dataBaseService.update("onKanban", onKanban+1)
        dataBaseService.update('notes', Array.from(hashMap.entries()));
    }
    
    const handleToDelete = async (id) => {
        const hashMap = new Map(notes); 
        hashMap.delete(note.id); 
        setNotes(hashMap); 
        const data = Array.from(hashMap.entries()); 
        new DataBaseService().update('notes', data); 
    }

    const handleToChangeColor = (color) => {
        const noteUpdate = note; 
        noteUpdate.color = palette[color]
        updateDataBase(note); 
    }

    const handleToChangeTitle = (titleUpdate) => {
        setTitle(titleUpdate);
        const noteUpdate = note; 
        noteUpdate.details = titleUpdate; 
        updateDataBase(noteUpdate);
    }

    const handleToChangeDetails = (detailsUpdate) => {
        setDetails(detailsUpdate);
        const noteUpdate = note; 
        noteUpdate.details = detailsUpdate; 
        updateDataBase(noteUpdate);
    }

    return (
       <Card elevation={3} className={classes.card} >
            <NoteHeader title={title} onEditMode={(titleUpdate) => handleToChangeTitle(titleUpdate)} /> 
            <NoteContent details={details} onEditMode={(detailsUpdate) => handleToChangeDetails(detailsUpdate)} />
            <NoteActions 
                note={note} 
                language={language}
                onPalette={handleToChangeColor}
                onDelete={handleToDelete}
                onChangeState={handleToChangeState}
            />
       </Card>
    )
}
