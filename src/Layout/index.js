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




export default function Layout( {paletteType, setPaletteType} ) {

    const classes = useStyles(); 
    const [notes, setNotes] = useState([])
    const [mode, setMode] = useState(0); 


    const Body = () => {
      return (
         !mode? 
          <BrainStormView 
              notes={notes} 
              setNotes={setNotes} 
          /> : 
          <ProductiveView 
              notes={notes} 
              setNotes={setNotes}
          />
      ); 
    }


    useEffect(() => {
      fetch('http://localhost:8000/notes')
        .then(response => response.json())
        .then(data => setNotes(data)); 
    }, [])
  
    
    useEffect(() => {
      fetch('http://localhost:8000/notes')
        .then(response => response.json())
    }, [notes] )
  
  
    return (
        <div className={classes.root}>
            <Header notes={notes} paletteType={paletteType} setPaletteType={setPaletteType} mode={mode} setMode={setMode} /> 
            <CreateNote notes={notes} setNotes={setNotes}  mode={mode} />
            <Body /> 
        </div>
    )
}
