import React, {useState, useEffect } from 'react'
import {createMuiTheme, ThemeProvider} from '@material-ui/core'
import Layout from './Layout';
import CssBaseline from '@material-ui/core/CssBaseline';



function App() {
  const getPaletteType = () => {
    return JSON.parse( localStorage.getItem('palette') || true ) ;
  }
  const [paletteType, setPaletteType] = useState(getPaletteType())

  useEffect(() => {
      localStorage.setItem('palette', paletteType); 
  }, [paletteType])

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#FFD32A', 
        main: '#FDCA40',
        dark: '#CCAA21'
      },
      secondary: {
        main: '#3d5afe',
      },
      type: paletteType? 'light' : 'dark', 
      background: {
        default: paletteType? '#FAFAFA' : '#212324' ,  
        paper: paletteType? '#FAFAFA' : '#212324' ,
      }
    },
    typography: {
      fontFamily: 'Poppins', 
      fontWeightLight: 300, 
      fontWeightRegular: 400, 
      fontWeightMedium: 500, 
      fontWeightBold: 600
    }, 
    
  });

  return (
  <ThemeProvider theme={theme} >
      <CssBaseline/>
      <Layout paletteType={paletteType} setPaletteType={setPaletteType} />
  </ThemeProvider>
  );  
}

export default App;
