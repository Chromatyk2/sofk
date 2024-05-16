import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { useCookies } from 'react-cookie';
import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
import HomePage from './component/home.js';
import NavBar from './component/navbar.js';
import Login from './services/auth.services.js';
import StreamOnLayout from "./component/StreamOnLayout";
import ClipsLayout from "./component/ClipsLayout";
import Footer from "./component/footer";
import LinkToStream from "./component/LinkToStream";
function App() {
  const [cookies, setCookie] = useCookies();
  if(Object.keys(cookies).length == 0) {
    return <Login />
  }
  return(
    <>
      <BrowserRouter>
        <LinkToStream cookies={cookies} />
        <NavBar cookies={cookies}/>
        <Routes>
          <Route path="/" element={<HomePage cookies={cookies}/>}/>
          <Route path="/Streams" element={<StreamOnLayout cookies={cookies}/>}/>
          <Route path="/Clips" element={<ClipsLayout cookies={cookies}/>}/>
        </Routes>
        <Footer cookies={cookies}/>
      </BrowserRouter>
    </>
  );
}

export default App;
