import React, { useState }  from 'react';

import makeStyles  from '@material-ui/core/styles/makeStyles';
import InputBase from '@material-ui/core/InputBase';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import format from 'date-fns/format'
import { v4 as uuidv4 } from 'uuid';

import '../../styles.css'; 
import palette from '../NoteCard/palette'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 275,
    marginTop: theme.spacing(15), 
    marginButton: theme.spacing(5),
    marginLeft: 'auto', 
    marginRight: 'auto', 
    backgroundColor: theme.palette.type === 'dark' ? '#303030' : '#fafafa', 
  }, 
  title: {
    fontSize: 14,
  },
}));

const getRandonColor = (array, currentColor) => {
  let newColor = array[Math.floor(Math.random() * array.length)]; 
  while ( currentColor === newColor) {
    newColor = array[Math.floor(Math.random() * array.length)]; 
  }  
  return newColor; 
}

export default function CreateNote({ notes, setNotes, mode, language }) {

    const [color, setColor] = useState(getRandonColor(palette, ""))
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState(format( new Date(),  'do MMMM Y')); 
    const state = !mode? 0 : 1; 


    const handleToSubmit = (e) => {
        e.preventDefault(); 
        document.getElementById("create-note").reset(); 

        if (title) {
          setColor( getRandonColor( palette, color ))
          setDate(format( new Date(),  'do MMMM Y'))
          const buildNote = { title, details, date, color,  id: uuidv4(), state }
          setNotes([buildNote, ...notes]); 

          /* Local Storage */
          localStorage.setItem('notes', JSON.stringify([buildNote, ...notes])); 
        }
        setDetails(''); 
        setTitle(''); 
    }
    const classes = useStyles();
    return (
      <Card className={classes.root} elevation={title || details? 3 : 0 } > 
        <form noValidate autoComplete="off"  onSubmit={handleToSubmit} id="create-note" >
          <CardContent>
            <InputBase
              className={classes.input}
              placeholder={!details? language.create.take_note : language.create.title}
              onChange={(e) => setTitle(e.target.value) }
              inputProps={{ maxLength: 30 }}
              required
            />
          </CardContent>
          {
            (title || details) &&
            <Fade 
              in={title || details}
              style={{ transformOrigin: '0 0 0' }}
              {...(title? { timeout: 500 } : {})}         
            >
              <CardContent>
                <InputBase
                    onChange={(e) => {
                      setDetails(e.target.value) 
                    }}
                    className={classes.input}
                    placeholder={language.create.details}
                    inputProps={{ maxLength: 130 }}
                />  
              </CardContent>
            </Fade>
          }
          { (title || details) && 
            <Fade 
              in={title || details}
              style={{ transformOrigin: '0 0 0' }}
              {...(title? { timeout: 1000 } : {})}         
            >
              <CardActions className='button' > 
                <Button size="small" type='submit' >
                    {language.create.create}
                </Button>
              </CardActions>
            </Fade>
          }
        </form>
      </Card>
    );
}