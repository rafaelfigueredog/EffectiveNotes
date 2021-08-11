import React from 'react'

import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import makeStyles  from '@material-ui/styles/makeStyles';
import InputBase  from '@material-ui/core/InputBase';

const useStyles = makeStyles(theme => {
    return (
        {
            text: {
                wordWrap: 'break-word'
            },
        }
    );
}); 

export default function NoteContent({ details, onEditMode }) {
    
    const classes = useStyles();
    
    // TODO: Add edit mode

    return (
        <CardContent>
            <InputBase
                className={classes.input}       
                value={details}
                onChange={(e) => onEditMode(e.target.value) }
                inputProps={{ maxLength: 140 }}
                required
            />
        </CardContent>
    );
}
