import React, {useState} from 'react' 
import {makeStyles} from '@material-ui/core/';
import Typograpy from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => {
    return {
        page:{  
            marginTop: theme.spacing(5), 
        },
    }
  })

export default function ProductiveView({ notes, setNotes, palette }) {

    const [todo, setTodo] = useState(notes)
    const [inProgress, setInProgress] = useState([])
    const [done, setDone] = useState([])

    const classes = useStyles()

    return (
        <div className={classes.page} >
            <Grid container direction="row" justify="space-around" alignItems="center" >

                <Grid item  >
                    { todo && <Typograpy variant='body1' color='textSecondary' > To-Do </Typograpy> }

            
                </Grid>

                

                <Grid item  >
                    { inProgress && <Typograpy variant='body1' color='textSecondary' > Doing </Typograpy> }
                    

                </Grid>

                

                <Grid item  >
                    { done && <Typograpy variant='body1' color='textSecondary' > Done </Typograpy> }

                </Grid>

            </Grid>
        </div>
    ); 
}