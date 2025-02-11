import React,{useState, useEffect} from 'react';
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
import Partners from "./component/partners";
import Modal from 'react-modal';
import StreamsModal from "./component/StreamsModal";
import Player from "./component/Player";
import Axios from 'axios'
function App() {
  const [refreash, setRefreash] = React.useState(0);
  const [cookies, setCookie] = useCookies();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [team, setTeam] = useState([]);
  const [onStream, setOnStream] = useState([]);
  const [offStream, setOffStream] = useState([]);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#325269'
    },
  };
  useEffect(() => {
    if(Object.keys(cookies).length == 0) {
      return <Login change={reloadEffect}/>
    }else{
      Axios.get(
          'https://api.twitch.tv/helix/teams?name=streamon',
          {
            headers: {
              'Authorization': `Bearer ${cookies.token.access_token}`,
              'Client-Id': process.env.REACT_APP_CLIENT_ID
            }
          }
      ).then(function (response) {
        if(response.status == 200) {
          setTeam(response.data.data[0].users);
          response.data.data[0].users.map((val, key) => {
            Axios.get(
                'https://api.twitch.tv/helix/streams?user_login=' + val.user_name,
                {
                  headers: {
                    'Authorization': `Bearer ${cookies.token.access_token}`,
                    'Client-Id': process.env.REACT_APP_CLIENT_ID
                  }
                }
            ).then(function (response) {
              if (response.data.data.length > 0) {
                setOnStream(oldArrayOn => [...oldArrayOn, {infos: response.data.data}]);
              } else if (response.data.data.length < 1) {
                setOffStream(oldArrayOff => [...oldArrayOff, val.user_name]);
              }
            })
          })
        }
      })
    }
  }, [refreash]);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function reloadEffect(){
    setRefreash(refreash + 1);
  }
  return(
    <>
      <BrowserRouter>
        <NavBar cookies={cookies}/>
        <Routes>
          <Route path="/" element={<HomePage cookies={cookies}/>}/>
          <Route path="/Streams" element={<StreamOnLayout cookies={cookies}/>}/>
          <Route path="/Clips" element={<ClipsLayout cookies={cookies}/>}/>
          <Route path="/Stream" element={<Player cookies={cookies}/>}/>
        </Routes>
        {/*<Partners cookies={cookies}/>*/}
        <Footer cookies={cookies}/>
        <div className={"buttonStreamsContainer"}>
          <button onClick={openModal} className={"buttonStreamers"}>Streameur.euses</button>
          <button className={"buttonStreamers"}>Boutique</button>
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
              <p style={{color: "white"}}>Streameur.euses</p>
              <button style={{color:"white", border:"none", background:"none"}} onClick={closeModal}>X</button>
            </div>
            <div className={"streamsModalContainer"}>
              <StreamsModal change={closeModal} cookies={cookies} onStream={onStream} offStream={offStream}/>
            </div>
          </Modal>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
