import React, { useState }  from 'react';
import makeStyles  from '@material-ui/core/styles/makeStyles';
import InputBase from '@material-ui/core/InputBase';
import { v4 as uuidv4 } from 'uuid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button';
import format from 'date-fns/format'
import './styles.css'; 



const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
    marginTop: theme.spacing(15), 
    marginButton: theme.spacing(5),
    marginLeft: 'auto', 
    marginRight: 'auto', 
  }, 
  title: {
    fontSize: 14,
  },
}));

const getRandonColor = (array, currentColor) => {
  let newColor = array[[Math.floor(Math.random() * array.length)]].value; 
  while ( currentColor === newColor) {
    newColor = array[[Math.floor(Math.random() * array.length)]].value; 
  }  
  return newColor; 
}

export default function CreateNote({ notes, setNotes, palette }) {

    const [color, setColor] = useState('')
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState(format( new Date(),  'do MMMM Y')); 

    const handleToSubmit = (e) => {
        
        e.preventDefault(); 
        document.getElementById("create-note").reset(); 
        setColor( getRandonColor( palette, color ))
        setDate(format( new Date(),  'do MMMM Y'))
        const buildNote = { title, details, date, color,  id: uuidv4() }
        setNotes([...notes, buildNote]); 

        if ( title && details ) {
          fetch('http://localhost:8000/notes', {
            method: 'POST', 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(buildNote) 
          })
        }   
    }

    const classes = useStyles();

    return (

      <Card className={classes.root} elevation={0} > 
        
        <CardHeader
          subheader='Take a note'
        />

        <form noValidate autoComplete="off"  onSubmit={handleToSubmit} id="create-note" >
        <CardContent>
          <InputBase
            className={classes.input}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value) }
            inputProps={{ maxLength: 30 }}
          />
        </CardContent>

        <CardContent>
          <InputBase
              onChange={(e) => setDetails(e.target.value) }
              className={classes.input}
              placeholder="Details"
              multiline
              required
              inputProps={{ maxLength: 120 }}
          />  

            <Button size="small" type='submit' >
                create
            </Button>
        </CardContent>

        <CardActions className='button' > 
            
        </CardActions>
          
        </form>
      </Card>
    );
}