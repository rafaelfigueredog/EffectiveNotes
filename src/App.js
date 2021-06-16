import React, {useState } from 'react'
import {createMuiTheme, ThemeProvider} from '@material-ui/core'
import Layout from './Layout';
import CssBaseline from '@material-ui/core/CssBaseline';


function App() {

  const [paletteType, setPaletteType] = useState(true)

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#fafafa',
      },
      secondary: {
        main: '#ffc107',
      },
      type: paletteType? 'light' : 'dark', 
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
