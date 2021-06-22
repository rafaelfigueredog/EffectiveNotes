import React, { useState, useEffect } from "react";
import { Divider, makeStyles, Typography } from "@material-ui/core/";
import Typograpy from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container'
import Grid from "@material-ui/core/Grid";
import NoteCard from "../NoteCard";
import '../../styles.css'

const useStyles = makeStyles((theme) => {
  return {
    page: {
      marginTop: theme.spacing(5),
    },
    subtitle: {
      flexGrow: 1, 
      marginBottom: theme.spacing(3), 
      marginTop: theme.spacing(3)
    }, 
    notes: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2), 
    },
  };
});




export default function ProductiveView({ notes, setNotes}) {

  const [todo, setTodo] = useState(notes.filter(note => note.state === 1));
  const [inProgress, setInProgress] = useState(notes.filter(note => note.state === 2));
  const [done, setDone] = useState(notes.filter(note => note.state === 3));

  useEffect(() => {
    setTodo(notes.filter(note => note.state === 1)); 
    setInProgress(notes.filter(note => note.state === 2)); 
    setDone(notes.filter(note => note.state === 3));
  }, [notes])

  const classes = useStyles();

  return (
    <Container className={classes.page} >
      <div className="column"> 
        <Typograpy className={classes.subtitle} align='center'variant='body1' color='textSecondary' > To-do </Typograpy>
        <Grid container spacing={2} direction="row" justify="center" alignItems="flex-start"  >
          {todo.map(note => (
            <Grid item key={note.id} xs={12} sm={4} md={3} lg={9} > 
                <NoteCard 
                  note={note} 
                  notes={notes}
                  setNotes={setNotes}
                />
            </Grid>
          ))}
        </Grid>
      </div>
      <Divider orientation='vertical' flexItem />
      <div class="column"> 
        <Typograpy className={classes.subtitle} align='center'variant='body1' color='textSecondary'  > Doing </Typograpy>
        <Grid container spacing={2} direction="row" justify="center" alignItems="flex-start"  >
          {inProgress.map(note => (
            <Grid item key={note.id} xs={12} sm={4} md={3} lg={9} > 
                <NoteCard 
                  note={note} 
                  notes={notes}
                  setNotes={setNotes}
                />
            </Grid>
          ))}
        </Grid>
      </div>
      <Divider orientation='vertical' flexItem />
      <div class="column"> 
        <Typograpy className={classes.subtitle} align='center' variant='body1' color='textSecondary' > Done </Typograpy>
        <Grid container spacing={2} direction="row" justify="center" alignItems="flex-start"  >
          {done.map(note => (
            <Grid item key={note.id} xs={12} sm={4} md={3} lg={9} > 
                <NoteCard 
                  note={note} 
                  notes={notes}
                  setNotes={setNotes}
                />
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
}
