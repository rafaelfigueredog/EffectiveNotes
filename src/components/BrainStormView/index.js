import React, { useState, useEffect } from 'react'
import { Container, Grid, makeStyles } from '@material-ui/core';
import NoteCard from '../NoteCard';
import Masonry from 'react-masonry-css'
import '../../styles.css'

const useStyles = makeStyles((theme) => {
  return {
      page:{  
          marginTop: theme.spacing(10), 
          display: 'flex', 
          alignItems: 'flex-start',
          justifyContent: 'center'
      },
      containerNotes: {
        width: '80%'
      }, 
      toolbar: theme.mixins.toolbar, 
      
  }
})

export default function BrainStormView({ notes, setNotes, onKanban, setOnKanban }) {

  const [brainstorming, setBrainstorming] = useState(notes? notes.filter(note => note.state === 0) : []); 

  useEffect(() => {
    setBrainstorming(notes? notes.filter(note => note.state === 0) : [])
  }, [notes])

  const classes = useStyles()

  const breakpoints = {
    default: 4,
    1500: 3, 
    1100: 2,
    700: 1,
  };

  return (
    <div className={classes.page} >
      <div className={classes.containerNotes}   >
            <Masonry 
              breakpointCols={breakpoints}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
            {brainstorming.map(note => (
              <div key={note.id} >
                <NoteCard 
                    note={note} 
                    notes={notes}
                    setNotes={setNotes}
                    onKanban={onKanban}
                    setOnKanban={setOnKanban}
                />
              </div>
            ))}
            </Masonry>
        </div>
    </div>
  )
}
