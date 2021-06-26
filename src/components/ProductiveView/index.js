import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Container from '@material-ui/core/Container'
import { v4 as uuidv4 } from 'uuid';
import NoteCard from "../NoteCard";
import '../../styles.css'

const useStyles = makeStyles((theme) => {
  return {
    page: {
      marginTop: theme.spacing(5),
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
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start', 
      margin: theme.spacing(1), 
      minHeight: '400px', 
      borderRadius: 5,    
    },
   /*  colorDrag: () => {
      return theme.palette.type === 'ligth'? '#f5f5f5' : '#424242',   
    } */
  };
});

const TODO = uuidv4(); 
const INPROGRESS = uuidv4(); 
const DONE = uuidv4(); 

const columnsFromBackEnd = (notes) => {
  return {
    [TODO]: {
      name: "To-do",
      items: notes
    }, 
    [INPROGRESS]: {
      name: "In Progress",
      items: []
    },
    [DONE]: {
      name: "Done",
      items: []
    }
  };
}

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
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

export default function ProductiveView({notes, setNotes, onKanban, setOnKanban, paletteType}) {
  
  const [columns, setColumns] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const todoList = notes.filter(note => note.state === 1);  
    setColumns(columnsFromBackEnd(todoList)); 
  }, [notes])

  if ( onKanban ) {
    setOnKanban(0); 
  }
  
  return (
    <Container className={classes.page} >
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                class='column'
                key={columnId}
              >
                <div>
                  <h3 className={classes.subtitle}> {column.name} </h3>
                </div>
                
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
                                        <NoteCard note={note} />
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
        })}
      </DragDropContext>
    </Container>
  );
}