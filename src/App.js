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
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  const [token, setToken] = useState(null);
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
  // useEffect(() => {
  //   Axios.post(
  //       'https://id.twitch.tv/oauth2/token',
  //       {
  //         client_id:CLIENT_ID,
  //         client_secret:CLIENT_SECRET,
  //         grant_type:"client_credentials",
  //         redirect_uri:"https://preview--streamonforkids.netlify.app/"
  //       }
  //   )
  //       .then(
  //           (result) => {
  //             setToken(result.data.access_token);
  //             const currentToken = result.data.access_token;
  //             Axios.get(
  //                 'https://api.twitch.tv/helix/teams?name=streamon',
  //                 {
  //                   headers: {
  //                     'Authorization': `Bearer ${currentToken}`,
  //                     'Client-Id': process.env.REACT_APP_CLIENT_ID
  //                   }
  //                 }
  //             ).then(function (response) {
  //               if(response.status == 200) {
  //                 setTeam(response.data.data[0].users);
  //                 response.data.data[0].users.map((val, key) => {
  //                   Axios.get(
  //                       'https://api.twitch.tv/helix/streams?user_login=' + val.user_name,
  //                       {
  //                         headers: {
  //                           'Authorization': `Bearer ${currentToken}`,
  //                           'Client-Id': process.env.REACT_APP_CLIENT_ID
  //                         }
  //                       }
  //                   ).then(function (response) {
  //                     if (response.data.data.length > 0) {
  //                       setOnStream(oldArrayOn => [...oldArrayOn, {infos: response.data.data}]);
  //                     } else if (response.data.data.length < 1) {
  //                       setOffStream(oldArrayOff => [...oldArrayOff, val.user_name]);
  //                     }
  //                   })
  //                 })
  //               }
  //             })
  //           }
  //       )
  //
  // }, []);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);

      Axios.post(
          'https://id.twitch.tv/oauth2/token',
          {
              client_id:CLIENT_ID,
              client_secret:CLIENT_SECRET,
              grant_type:"client_credentials",
              redirect_uri:"https://preview--streamonforkids.netlify.app/"
          }
      )
          .then(
              (result) => {
                  setToken(result.data.access_token);
                  const currentToken = result.data.access_token;
                  Axios.get(
                      'https://api.twitch.tv/helix/teams?name=streamon',
                      {
                          headers: {
                              'Authorization': `Bearer ${currentToken}`,
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
                                          'Authorization': `Bearer ${currentToken}`,
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
          )
  }
    function refreshStreamers() {
        Axios.post(
            'https://id.twitch.tv/oauth2/token',
            {
                client_id:CLIENT_ID,
                client_secret:CLIENT_SECRET,
                grant_type:"client_credentials",
                redirect_uri:"https://preview--streamonforkids.netlify.app/"
            }
        )
            .then(
                (result) => {
                    setToken(result.data.access_token);
                    const currentToken = result.data.access_token;
                    Axios.get(
                        'https://api.twitch.tv/helix/teams?name=streamon',
                        {
                            headers: {
                                'Authorization': `Bearer ${currentToken}`,
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
                                            'Authorization': `Bearer ${currentToken}`,
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
            )
    }
  return(
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage change={refreshStreamers}/>}/>
          <Route path="/Streams" element={<StreamOnLayout offStream={offStream} onStream={onStream}/>}/>
          <Route path="/Clips" element={<ClipsLayout token={token}/>}/>
          <Route path="/Stream" element={<Player token={token}/>}/>
        </Routes>
        {/*<Partners cookies={cookies}/>*/}
        <Footer />
        <div className={"buttonStreamsContainer"}>
          <button onClick={openModal} className={"buttonStreamers"}>Streameur.euses</button>
          <button className={"buttonStreamers"}>Boutique</button>
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
              <p style={{color: "white"}}>Streameur.euses</p>
              <button style={{color:"white", border:"none", background:"none"}} onClick={closeModal}>X</button>
            </div>
            <div className={"streamsModalContainer"}>
              <StreamsModal change={closeModal} onStream={onStream} offStream={offStream} token={token}/>
            </div>
          </Modal>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
