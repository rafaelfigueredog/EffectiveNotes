import React from 'react'

import CardContent from '@material-ui/core/CardContent'
import makeStyles  from '@material-ui/styles/makeStyles';
import InputBase  from '@material-ui/core/InputBase';

const useStyles = makeStyles(theme => {
    return ({
        input: {
            wordWrap: 'break-word'
        },
    });
}); 

export default function NoteContent({ details, onEditMode }) {
    
    const classes = useStyles();

    return (
        <CardContent>
            <InputBase
                className={classes.input}       
                value={details}
                onChange={(e) => onEditMode(e.target.value) }
                inputProps={{ maxLength: 140 }}
                multiline
                required
            />
        </CardContent>
    );
}
