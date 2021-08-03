import React from 'react'

import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import makeStyles  from '@material-ui/styles/makeStyles';

const useStyles = makeStyles({
    text: {
        wordWrap: 'break-word'
    }
}); 

export default function NoteContent({ content }) {
    
    const classes = useStyles();
    
    // TODO: Add edit mode

    const ShowContent = () => {
        return (
            <CardContent>
                <Typography className={classes.text} variant='body2'>
                    {content}
                </Typography>
            </CardContent>
        );
    } 

    return content && <ShowContent /> 
}
