import {createMuiTheme, ThemeProvider} from '@material-ui/core'
import Layout from './Layout';
import 'rsuite/dist/styles/rsuite-default.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fafafa',
    },
    secondary: {
      main: '#ffc107',
    },
  },
  typography: {
    fontFamily: 'Poppins', 
    fontWeightLight: 300, 
    fontWeightRegular: 400, 
    fontWeightMedium: 500, 
    fontWeightBold: 600
  }
});

function App() {
  return (
  <ThemeProvider theme={theme} >
      <Layout />
  </ThemeProvider>
  );  
}

export default App;
