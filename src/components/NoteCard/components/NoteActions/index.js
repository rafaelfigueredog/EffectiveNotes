import React from 'react'

import CardContent from '@material-ui/core/CardContent'
import makeStyles  from '@material-ui/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip';

import {RiPaletteLine} from 'react-icons/ri'
import {RiDeleteBin2Line} from 'react-icons/ri'
import {BsKanban} from 'react-icons/bs'

import PopoverColors from '../PopoverColors';
import Palette from '../Palette';

const useStyles = makeStyles((theme) => {
    return {
        containerIcons: {
            display: 'flex',  
        },
    }
}); 

export default function NoteActions({note, language, onPalette, onDelete, onChangeState }) {
    
    const classes = useStyles();
    
    return (
        <CardContent className={classes.containerIcons} >
                <PopoverColors  
                    icon={<RiPaletteLine />} 
                    palette={Palette} 
                    selectColor={onPalette} 
                    noteColor={note.color} 
                    language={language} 
                />

                <Tooltip title={language.note_actions.delete} placement='bottom-start' >
                    <IconButton  onClick={() => onDelete(note.id)} >
                        <RiDeleteBin2Line />
                    </IconButton>
                </Tooltip>

                {
                    note.state === 0 &&  
                    <Tooltip title={language.note_actions.add_todo} placement='bottom-start' >
                        <IconButton  onClick={() => onChangeState(note.id, 1)}>
                            <BsKanban />
                        </IconButton>
                    </Tooltip>
                }   
            </CardContent>
    );
}
