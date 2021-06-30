import React, { useState, useEffect } from "react";
import { Fade, makeStyles } from "@material-ui/core/";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Container from '@material-ui/core/Container';
import Collapse from "@material-ui/core/Collapse";
import Grow from '@material-ui/core/Grow'
import { v4 as uuidv4 } from 'uuid';

import {ReactComponent as IllustrationDark} from '../../assets/img/ProdIllustrationDark/Mediamodifier-Design.svg'
import {ReactComponent as IllustrationLight} from '../../assets/img/ProdIllustrationLight/Mediamodifier-Design.svg'
import NoteCard from "../NoteCard";
import '../../styles.css'

const useStyles = makeStyles((theme) => {
  return {
    page: {
      marginTop: theme.spacing(5),
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
             theme.palette.grey[300] :
             theme.palette.grey[500],   
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
      borderRadius: 5,    
    },
  };
});

const TODO = uuidv4(); 
const INPROGRESS = uuidv4(); 
const DONE = uuidv4(); 

const columnsFromBackEnd = (todo, inProgress, done) => {
  return {
    [TODO]: {
      name: "To-do",
      items: todo,
      state: 1
    }, 
    [INPROGRESS]: {
      name: "In Progress",
      items: inProgress,
      state: 2
    },
    [DONE]: {
      name: "Done",
      items: done, 
      state: 3, 
    }
  };
}

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

export default function ProductiveView({notes, setNotes, onKanban, setOnKanban, paletteType, mode}) {
  
  const [columns, setColumns] = useState({});
  const [changeOnDrag, setChangeOnDrag] = useState(false);
  const [empty, setEmpty] = useState(true); 

  const classes = useStyles();

  const ShowIllustration = (todo, inProgress, done) => {
    return todo.length === 0 && inProgress.length === 0 && done.length === 0;
  }

  useEffect(() => {
    if (changeOnDrag) {
      setChangeOnDrag(false); 
      return;
    }
    const todo = notes.filter(note => note.state === 1);
    const inProgress = notes.filter(note => note.state === 2); 
    const done = notes.filter(note => note.state === 3);
    console.log(todo, inProgress, done); 
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
        {...(empty ? { timeout: 1000 } : {})}         
      >
        <IllustrationDark width={400} height={400} />
      </Fade>
    );
  }

  const LightPicture = () => {
    return (
      <Fade  
        in={empty}
        style={{ transformOrigin: '0 0 0' }}
        {...(empty ? { timeout: 1000 } : {})}          
      >
        <IllustrationLight width={400} height={400} />
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
                            flexFade: 1,
                            alignSelf: 'stretch' 
                          }} 
                          
                        >
                          <div>
                            <h3 className={classes.subtitle}> {column.name} </h3>
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