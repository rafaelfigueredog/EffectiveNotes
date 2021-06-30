import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core';
import Masonry from 'react-masonry-css'
import Grow from '@material-ui/core/Grow'
import Fade from '@material-ui/core/Fade'
import '../../styles.css'
import NoteCard from '../NoteCard';
import {ReactComponent as IllustrationLight} from '../../assets/img/illustrationLight/Mediamodifier-Design.svg'
import {ReactComponent as IllustrationDark} from '../../assets/img//illustrationDark/Mediamodifier-Design.svg'

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

export default function BrainStormView({ notes, setNotes, onKanban, setOnKanban, theme}) {

  const [brainstorming, setBrainstorming] = useState(notes? notes.filter(note => note.state === 0) : []); 

  useEffect(() => {
    setBrainstorming(notes? notes.filter(note => note.state === 0) : [])
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
        <IllustrationDark width={400} height={400} />
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
        <IllustrationLight width={400} height={400} />
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
            
              {brainstorming.map(note => (
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
