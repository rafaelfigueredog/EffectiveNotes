import React, { useState, useEffect } from "react";
import { Fade, makeStyles, Typography } from "@material-ui/core/";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Container from '@material-ui/core/Container';
import { v4 as uuidv4 } from 'uuid';

import Illustration from '../../assets/img/checkmark.png'
import NoteCard from "../NoteCard";
import languages from "../../languages";
import '../../styles.css'

const useStyles = makeStyles((theme) => {
  return {
    page: {
      marginTop: theme.spacing(5),
      padding: 10, 
    },
    context: {
      marginTop: theme.spacing(5),
      display: 'flex', 
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    subtitle: {
      flexGrow: 1, 
      textAlign: 'center', 
      color: theme.palette.type === 'dark'?
             theme.palette.grey[100] :
             theme.palette.grey[900],   
      marginBottom: theme.spacing(3), 
      marginTop: theme.spacing(3)
    }, 
    notes: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2), 
    },
    containerNotes: {
      display: 'flex', 
      flexGrow: 1, 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start', 
      margin: theme.spacing(1), 
      minHeight: '100vh', 
      width: 300,  
      flexFade: 1,
      alignSelf: 'stretch',  
    },
    titleboard: {
      width: '100%',

      backgroundColor: theme.palette.type === 'light'?
                       theme.palette.grey[200] :
                       theme.palette.grey[800], 
      borderRadius: 3, 
    }, 
  };
});

const TODO = uuidv4(); 
const INPROGRESS = uuidv4(); 
const DONE = uuidv4(); 


const onDragEnd = (result, columns, setColumns, notes, setNotes, setChangeOnDrag) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);

    // update notes
    const index = notes.findIndex(note => note.id === removed.id); 
    const noteToUpdate = notes[index]; 
    noteToUpdate.state = destColumn.state;  
    const updateNotes = [...notes] 
    updateNotes[index] = noteToUpdate; 
    setChangeOnDrag(true); 
    setNotes(updateNotes)
    
    /* Local Storage */
    localStorage.setItem('notes', JSON.stringify(notes)); 

    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

export default function ProductiveView({notes, setNotes, onKanban, setOnKanban, paletteType, language}) {
  
  const columnsFromBackEnd = (todo, inProgress, done) => {
    return {
      [TODO]: {
        name: "todo",
        items: todo,
        state: 1
      }, 
      [INPROGRESS]: {
        name: "doing",
        items: inProgress,
        state: 2
      },
      [DONE]: {
        name: "done",
        items: done, 
        state: 3, 
      }
    };
  }

  const [columns, setColumns] = useState({});
  const [nameColumns, setNameColumns] = useState(languages.kanban)
  const [changeOnDrag, setChangeOnDrag] = useState(false);
  const [empty, setEmpty] = useState(true); 

  const classes = useStyles();

  const ShowIllustration = (todo, inProgress, done) => {
    return todo.length === 0 && inProgress.length === 0 && done.length === 0;
  }

  useEffect(() => {
    setNameColumns(language.kanban)
  }, [language])

  useEffect(() => {

    if (changeOnDrag) {
      setChangeOnDrag(false); 
      return;
    }

    const todo = notes.filter(note => note.state === 1);
    const inProgress = notes.filter(note => note.state === 2); 
    const done = notes.filter(note => note.state === 3);

    setColumns(columnsFromBackEnd(todo, inProgress, done));
    setEmpty(ShowIllustration(todo, inProgress, done)); 

  }, [notes])

  if ( onKanban ) {
    setOnKanban(0); 
    localStorage.setItem('onKanban', JSON.stringify(0));
  }

  
  const DarkPicture = () => {
    return (
      <Fade  
        in={empty}
        style={{ transformOrigin: '0 0 0' }}
        {...(empty ? { timeout: 500 } : {})}         
      >
        <img src={Illustration} width={200} height={200} alt='' />
      </Fade>
    );
  }

  const LightPicture = () => {
    return (
      <Fade  
        in={empty}
        style={{ transformOrigin: '0 0 0' }}
        {...(empty ? { timeout: 500 } : {})}          
      >
        <img src={Illustration} width={200} height={200} alt='' />
      </Fade>
    );
  }
  
  return (
    <Container className={ empty? classes.context : classes.page} >
      { empty ? 
            paletteType? <LightPicture /> : <DarkPicture /> : 
      <DragDropContext 
            onDragEnd={result => onDragEnd( 
            result, 
            columns,  
            setColumns, 
            notes, 
            setNotes,
            setChangeOnDrag, 
        )}>
        { Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  className='column'
                  key={columnId}
                >
                  <Droppable droppableId={columnId} key={columnId}>
                    { (provided, snapshot) => {
                      return (
                        <div
                          {... provided.droppableProps } 
                          ref={provided.innerRef}
                          className={classes.containerNotes}
                          style={{
                            background: snapshot.isDraggingOver
                              ? paletteType? '#f5f5f5' : '#424242'
                              : null,
                          }} 
                          
                        >
                          <div className={classes.titleboard} >
                            <Typography variant='h6'className={classes.subtitle}> {nameColumns[column.name]} </Typography>
                          </div>
                          {
                            column.items.map((note, index) => {
                              return (
                                <Draggable
                                  key={note.id}
                                  draggableId={note.id}
                                  index={index}
                                >
                                  {
                                    (provided, snapshot) => {
                                      return (
                                        
                                        <div 
                                          className={classes.notes}
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={
                                            {...provided.draggableProps.style}
                                          }
                                        >
                                          <NoteCard 
                                            note={note} 
                                            notes={notes}
                                            setNotes={setNotes}
                                            onKanban={onKanban}
                                            setOnKanban={setOnKanban} 
                                            language={language}
                                          />  
                                        </div>
                                      );
                                    }
                                  }
                                </Draggable>
                              )
                            })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              );
          })
        }        
      </DragDropContext>
    }
    </Container>
  );
}