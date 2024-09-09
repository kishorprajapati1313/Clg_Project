import Footer from "./Component/Componets/Footer";
import Navbar from "./Component/Componets/Navbar";
import Imagegenrater from "./Component/Imagegenrater";
import Login from "./Component/Pages/Login";
import Sign from "./Component/Pages/Sign";

// import Test from "./Component/Test";
import VideoGerater from "./Component/VideoGerater";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profilehome from "./Component/Pages/profile/Profilehome";
import Profilehistory from "./Component/Pages/profile/Profilehistory";
import Forgot from "./Component/Pages/Forgot";
import Profilepayemnt from "./Component/Pages/profile/Profilepayemnt";
import Upscale from "./Component/UI/Upscale/Upscale";
import Upscalecs from "./Component/UI/Upscale/Upscale_copy";

function App() {
  return (
    <>

      <Router>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "0vh" }} >
          <div style={{ flex: "1" }}>
          <div className="background" style={{ backgroundColor: "rgba(128, 128, 128, 0.1)", WebkitBackdropFilter: 'blur(8px)' }}></div>

            <Navbar />

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/sign" element={<Sign />} />
              <Route path="/forgot" element={<Forgot />} />

              {/*changein both */}
              {/*changein both */}
              {/* -----------------------------Video Genration ------------------------------------------ */}
              {/* <Route path="/" element={<VideoGerater />} />
              <Route path="/home" element={<VideoGerater />} /> */}

               {/* -----------------------------Image Genration ------------------------------------------ */}
              {/* <Route path="/" element={<Imagegenrater />} />
              <Route path="/home" element={<Imagegenrater />} /> */}

              {/* -----------------------------Image Genration ------------------------------------------ */}
              {/* <Route path="/" element={<Upscale />} />
              <Route path="/home" element={<Upscale />} /> */}

              <Route path="/" element={<Upscalecs />} />
              <Route path="/home" element={<Upscalecs />} />

              <Route path="/profile/home" element={<Profilehome />} />
              <Route path="/profile/history" element={<Profilehistory />} />
              <Route path="/profile/bill" element={<Profilepayemnt />} />
            </Routes>
            <Footer />

          </div>
        </div>
      </Router>
      {/* <Imagegenrater /> */}


    </>
  );
}

export default App;