import React from 'react' 

import CardContent from '@material-ui/core/CardContent' 
import InputBase from '@material-ui/core/InputBase';
import makeStyles  from '@material-ui/styles/makeStyles';

const useStyles = makeStyles({
    input: {
        wordWrap: 'break-word',
        fontSize: 20, 
        fontWeight: 400,
    }
}); 

export default function NoteHeader({ title, onEditMode }) {
    
    const classes = useStyles();

    return (
        <CardContent>
            <InputBase
                className={classes.input}
                value={title}
                onChange={(e) => onEditMode(e.target.value) }
                inputProps={{ maxLength: 100 }}
                multiline
                required
            />
        </CardContent>
    ); 
}
