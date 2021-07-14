import React, {useState, useEffect } from 'react'

import {createMuiTheme, ThemeProvider} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from './Layout';
import languages from './languages';

function App() {
  const getPaletteType = () => {
    return JSON.parse( localStorage.getItem('palette') || true ) ;
  }

  const getLanguage = () => {
    const languageOption = localStorage.getItem('language') || 'English' ;
    return languages[languageOption];
  }

  const [paletteType, setPaletteType] = useState(getPaletteType())
  const [language, setLanguage] = useState(getLanguage());

  useEffect(() => {
      localStorage.setItem('palette', paletteType); 
  }, [paletteType])

  useEffect(() => {
    localStorage.setItem('language', language.value); 
  }, [language])

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
      <Layout 
        paletteType={paletteType} 
        setPaletteType={setPaletteType} 
        language={language} 
        setLanguage={setLanguage} 
      />
  </ThemeProvider>
  );  
}

export default App;
