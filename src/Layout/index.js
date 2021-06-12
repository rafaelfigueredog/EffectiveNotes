import { makeStyles } from '@material-ui/core'
import Header from '../components/Header'
import Content from '../Content'
import CreateNote from '../components/CreateNote'
import React, {useState} from 'react'
import palette from './palette'


const useStyles = makeStyles({
    root: {
        display: 'flex', 
        flexDirection: 'column'
    }, 
})

export default function Layout( {paletteType, setPaletteType} ) {

    const classes = useStyles(); 
    const [notes, setNotes] = useState([])

    return (
        <div className={classes.root}>
            <Header paletteType={paletteType} setPaletteType={setPaletteType} /> 
            <CreateNote notes={notes} setNotes={setNotes} palette={palette} />
            <Content notes={notes} setNotes={setNotes} palette={palette}/>
        </div>
    )
}
