import React, { useEffect, useState } from 'react'
import { Container, Grid, makeStyles } from '@material-ui/core';
import NoteCard from '../NoteCard';

const useStyles = makeStyles((theme) => {
  return {
      page:{  
          marginTop: theme.spacing(10), 
      },
      toolbar: theme.mixins.toolbar
  }
})

export default function BrainStormView( { notes, setNotes, palette } ) {

  const classes = useStyles()
  const colors = palette

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then(response => response.json())
      .then(data => setNotes(data)); 
  }, [])

  
  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then(response => response.json())
  }, [notes] )


  const handleToDelete = async (id) => {

    const updatedNotes = notes.filter(note => note.id !== id); 
    setNotes(updatedNotes); 

    // update de database
    await fetch('http://localhost:8000/notes/' + id, { method: 'DELETE' }) 
  }

  const handleUpdateNotesColor = async (noteId, indexColor) => {

    const index = notes.findIndex(note => note.id === noteId); 
    const { id, title, date, details } = notes[index];  
    const colorObject = colors[indexColor]
    const color = colorObject
    const updateNotes = [...notes] 

    const recolorNote = {
      id, 
      title, 
      date, 
      details, 
      color
    }

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

  return (
    <div className={classes.page} >
      <Container >
        <Grid  container direction="row" justify="center" alignItems="center" > 
          <Grid container item spacing={3} direction="row" justify="flex-start" alignItems="flex-start"  >
            {notes.map(note => (
              <Grid item key={note.id} xs={12} sm={4} md={3} lg={3} > 
                  <NoteCard note={note} handleToDelete={handleToDelete} palette={colors} updateNotesColor={handleUpdateNotesColor} ></NoteCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>  
    </div>
  )
}
