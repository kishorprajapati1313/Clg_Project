import { ThemeProvider } from "@emotion/react";
import { ColorModeContext, useMode } from "./Theme";
import { CssBaseline } from "@mui/material";
import Approute from "./Approute";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";

function App() {
  const [theme, colormode] = useMode();
  const var = 10;
  
  return (
    <>
      <ColorModeContext.Provider value={colormode}>
        <ThemeProvider theme={theme} >
          <CssBaseline>
            
            <Navbar />

            <Approute />

            <Footer />


          </CssBaseline>
        </ThemeProvider>
      </ColorModeContext.Provider>


    </>
  );
}

export default App;
