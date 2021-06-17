import { makeStyles } from '@material-ui/core'
import Header from '../components/Header'
import BrainStormView from '../components/BrainStormView'
import CreateNote from '../components/CreateNote'
import React, {useState} from 'react'
import palette from './palette'
import FloatOptionsButton from '../components/FloatOptionsButton'
import ProductiveView from '../components/ProductiveView'


const useStyles = makeStyles({
    root: {
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
    }, 
})


export default function Layout( {paletteType, setPaletteType} ) {

    const classes = useStyles(); 
    const [notes, setNotes] = useState([])
    const [mode, setMode] = useState(0)

    return (
        <div className={classes.root}>
            <Header paletteType={paletteType} setPaletteType={setPaletteType} /> 
            <CreateNote notes={notes} setNotes={setNotes} palette={palette} />
            {
                !mode? 
                    <BrainStormView notes={notes} setNotes={setNotes} palette={palette} /> : 
                    <ProductiveView notes={notes} setNotes={setNotes} palette={palette} />
            }
            <FloatOptionsButton mode={mode} setMode={setMode} />
        </div>
    )
}
