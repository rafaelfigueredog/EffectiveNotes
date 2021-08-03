import React from 'react'

import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import makeStyles  from '@material-ui/styles/makeStyles';

const useStyles = makeStyles({
    text: {
        wordWrap: 'break-word'
    }
}); 

export default function NoteHeader({ title }) {
    
    const classes = useStyles();

    // TODO: Add edit mode

    const ShowTitle = () => {
        return (
            <CardContent>
                <Typography className={classes.text} variant='h6'>
                    {title}
                </Typography>
            </CardContent>
        );
    } 

    return title && <ShowTitle /> 
}
