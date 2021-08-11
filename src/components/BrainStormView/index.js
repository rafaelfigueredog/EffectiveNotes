/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'

import makeStyles from '@material-ui/styles/makeStyles';
import Masonry from 'react-masonry-css'
import Grow from '@material-ui/core/Grow'
import Fade from '@material-ui/core/Fade'

import NoteCard from '../NoteCard';
import Illustration from '../../assets/img/creativity.png'
import '../../styles.css'

const useStyles = makeStyles((theme) => {
  return {
      page: {
        marginTop: theme.spacing(5), 
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

export default function BrainStormView({ notes, setNotes, onKanban, setOnKanban, theme, language}) {

  const [brainstorming, setBrainstorming] = useState([]); 

  useEffect(() => {
    const notesData = Array.from(notes.values())
    console.log(notesData); 
    setBrainstorming(notesData? notesData.filter(note => note.state === 0) : [])
  }, [notes])

  const classes = useStyles(brainstorming)

  const breakpoints = {
    default: 4,
    1500: 3, 
    1100: 2,
    700: 1,
  };

  const ShowIllustration = () => {
    return brainstorming.length === 0; 
  }

  const DarkPicture = () => {
    return (
      <Fade  
        in={ShowIllustration()} 
        style={{ transformOrigin: '0 0 0' }}
        {...(ShowIllustration() ? { timeout: 500 } : {})}
      >
        <img src={Illustration} width={200} height={200} alt='' />
      </Fade>
    );
  }

  const LightPicture = () => {
    return (
      <Fade  
        in={ShowIllustration()} 
        style={{ transformOrigin: '0 0 0' }}
        {...(ShowIllustration() ? { timeout: 500 } : {})}
      >
        <img src={Illustration} width={200} height={200} alt='' />
      </Fade>
    );
  }

  return (
    <div className={classes.page} >
      
      { ShowIllustration() ? 
        theme? <LightPicture /> : <DarkPicture /> :
      <div className={classes.containerNotes}>
            <Masonry 
              breakpointCols={breakpoints}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
            
              {brainstorming.map((note, index) => (
                <Grow 
                  in={!ShowIllustration()} 
                  style={{ transformOrigin: '0 0 0' }}
                  {...(!ShowIllustration() ? { timeout: 500 } : {})}
                >
                  <div key={note.id} >
                      <NoteCard 
                          note={note} 
                          notes={notes}
                          setNotes={setNotes} 
                          onKanban={onKanban}
                          setOnKanban={setOnKanban}
                          language={language}
                      />
                  </div>
                </Grow>
              ))}
            </Masonry>
        </div>
      }
    </div>
  )
}
