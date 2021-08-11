import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core'
import Header from '../components/Header'
import BrainStormView from '../components/BrainStormView'
import CreateNote from '../components/CreateNote'
import ProductiveView from '../components/ProductiveView'


const useStyles = makeStyles({
    root: {
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
    }, 
})

export default function Layout( {paletteType, setPaletteType, language, setLanguage} ) {

    const classes = useStyles(); 
    const [notes, setNotes] = useState(new Map())
    const [mode, setMode] = useState(0); 
    const [onKanban, setOnKanban] = useState(0);  
 

    /* useEffect(() => {
        const notesFromBackEnd = JSON.parse(localStorage.getItem('notes')) || []; 
        const modeFromBackEnd = JSON.parse(localStorage.getItem('mode')) || 0;
        const onKanbanFromBackEnd = JSON.parse(localStorage.getItem('onKanban')) || 0; 
        setOnKanban(onKanbanFromBackEnd);
        setNotes(notesFromBackEnd); 
        setMode(modeFromBackEnd);
    }, []) */
  
  
  
    return (
        <div className={classes.root}>
            <Header 
                notes={notes} 
                paletteType={paletteType} 
                setPaletteType={setPaletteType} 
                mode={mode} 
                setMode={setMode}
                onKanban={onKanban}
                language={language}
                setLanguage={setLanguage}
            /> 
            <CreateNote 
                notes={notes} 
                setNotes={setNotes}  
                mode={mode} 
                language={language}
            />
            {
                !mode? 
                <BrainStormView 
                    notes={notes} 
                    setNotes={setNotes} 
                    onKanban={onKanban}
                    setOnKanban={setOnKanban}
                    theme={paletteType}
                    language={language} 
                /> : 
                <ProductiveView 
                    notes={notes} 
                    setNotes={setNotes}
                    onKanban={onKanban}
                    setOnKanban={setOnKanban}
                    paletteType={paletteType}
                    language={language} 
                />
            }
        </div>
    )
}
