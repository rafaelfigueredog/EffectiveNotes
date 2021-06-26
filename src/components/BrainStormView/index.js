import React, { useState, useEffect } from 'react'
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

export default function BrainStormView({ notes, setNotes, onKanban, setOnKanban }) {

  const [brainstorming, setBrainstorming] = useState(notes.filter(note => note.state === 0)); 

  useEffect(() => {
    setBrainstorming(notes.filter(note => note.state === 0))
  }, [notes])

  const classes = useStyles()
  return (
    <div className={classes.page} >
      <Container >
        <Grid  container direction="row" justify="center" alignItems="center" > 
          <Grid container item spacing={3} direction="row" justify="flex-start" alignItems="flex-start"  >
            {brainstorming.map(note => (
              <Grid item key={note.id} xs={12} sm={4} md={3} lg={3} > 
                    <NoteCard 
                      note={note} 
                      notes={notes}
                      setNotes={setNotes}
                      onKanban={onKanban}
                      setOnKanban={setOnKanban}
                    />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>  
    </div>
  )
}
