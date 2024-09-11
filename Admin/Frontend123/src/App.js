import Approutes from "./Approutes";
import { ColorModeContext, useMode } from './Theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './Scene/global/Topbar';
import Sidebar from './Scene/global/Sidebar';

const App = () => {
  const [theme, colormode] = useMode();

  return (
    <ColorModeContext.Provider value={colormode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className='content'>
              <Topbar />
              <Approutes />
            </div>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
