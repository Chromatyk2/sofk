import React,{useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import { useCookies } from 'react-cookie';
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
import PersonalBar from "./component/PersonalBar";
import './App.css';
function App() {
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
    const [token, setToken] = useState(null);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [team, setTeam] = useState([]);
    const [onStream, setOnStream] = useState([]);
    const [offStream, setOffStream] = useState([]);
    const [charityTeam, setCharityTeam] = useState(null);
    const [charityStreamers, setCharityStreamers] = useState([]);
    const [load, setLoad] = useState(true);
    const [charityLoad, setCharityLoad] = useState(true);
    const [donations, setDonations] = useState([]);
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
        Axios.get(
            'https://streamlabscharity.com/api/v1/teams/643437249115068091'
        ).then(function (response) {
            setCharityTeam(response.data);
            Axios.get('https://streamlabscharity.com/api/v1/teams/643437249115068091/members?page=1')
                .then(function (response) {
                    response.data.data.map((val, key) => {
                        setCharityStreamers(oldArrayCharityStreamers => [...oldArrayCharityStreamers, val]);
                    })
                    if(response.data.next_page_url !== null){
                        Axios.get(response.data.next_page_url)
                            .then(function (response) {
                                response.data.data.map((val, key) => {
                                    setCharityStreamers(oldArrayCharityStreamers => [...oldArrayCharityStreamers, val]);
                                })
                                if(response.data.next_page_url !== null){
                                    Axios.get(response.data.next_page_url)
                                        .then(function (response) {
                                            response.data.data.map((val, key) => {
                                                setCharityStreamers(oldArrayCharityStreamers => [...oldArrayCharityStreamers, val]);
                                            })
                                            setCharityLoad(false);
                                        })
                                }else{
                                    setCharityLoad(false);
                                }
                            })
                    }else{
                        setCharityLoad(false);
                    }
            })
        })
    }, []);
    useEffect(() => {
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
                    charityStreamers.map((val, key) => {
                        Axios.get(
                            'https://api.twitch.tv/helix/streams?user_login=' + val.user.display_name,
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
                                setOffStream(oldArrayOff => [...oldArrayOff, val.user.display_name]);
                            }
                        })
                    })
                }
            )
        const interval = setInterval(() => {
                if (charityLoad === false) {
                    Axios.get('https://streamlabscharity.com/api/v1/teams/643437249115068091/donations?page=1')
                        .then(function (response) {
                            response.data.map((val, key) => {
                                setDonations(oldDonations => [...oldDonations, val]);
                            })
                            if (response.data.length == 500) {
                                Axios.get('https://streamlabscharity.com/api/v1/teams/643437249115068091/donations?page=2')
                                    .then(function (response) {
                                        response.data.map((val, key) => {
                                            setDonations(oldDonations => [...oldDonations, val]);
                                        })
                                        if (response.data.length == 500) {
                                            Axios.get('https://streamlabscharity.com/api/v1/teams/643437249115068091/donations?page=3')
                                                .then(function (response) {
                                                    response.data.map((val, key) => {
                                                        setDonations(oldDonations => [...oldDonations, val]);
                                                    })
                                                })
                                        }
                                    })
                            }
                        })
                }
            }, 60000
        );
        return () => {
            clearInterval(interval);
        };
    }, [charityLoad]);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    function refresh() {
        Axios.get(
            'https://streamlabscharity.com/api/v1/teams/643437249115068091'
        ).then(function (response) {
            setCharityTeam(response.data);
            Axios.get('https://streamlabscharity.com/api/v1/teams/643437249115068091/members?page=1')
                .then(function (response) {
                    response.data.data.map((val, key) => {
                        setCharityStreamers(oldArrayCharityStreamers => [...oldArrayCharityStreamers, val]);
                    })
                    if(response.data.next_page_url !== null){
                        Axios.get(response.data.next_page_url)
                            .then(function (response) {
                                response.data.data.map((val, key) => {
                                    setCharityStreamers(oldArrayCharityStreamers => [...oldArrayCharityStreamers, val]);
                                })
                                if(response.data.next_page_url !== null){
                                    Axios.get(response.data.next_page_url)
                                        .then(function (response) {
                                            response.data.data.map((val, key) => {
                                                setCharityStreamers(oldArrayCharityStreamers => [...oldArrayCharityStreamers, val]);
                                            })
                                            setCharityLoad(false);
                                        })
                                }else{
                                    setCharityLoad(false);
                                }
                            })
                    }else{
                        setCharityLoad(false);
                    }
                })
        })
    }
    return(
        <>
            <div className={window.location.pathname != "/OoqZvHhdnIrOGL" ? "globalDiv" : "globalDivTransparent"}>
                    <BrowserRouter>
                        <NavBar/>
                        <div className={"buttonStreamsContainer"}>
                            <button onClick={openModal} className={"buttonStreamers"}>Streameur.euses</button>
                            <button className={"buttonStreamers"}>Boutique</button>
                            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}
                                   contentLabel="Example Modal">
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                                    <p style={{color: "white"}}>Streameur.euses</p>
                                    <button style={{color: "white", border: "none", background: "none"}}
                                            onClick={closeModal}>X
                                    </button>
                                </div>
                                <div className={"streamsModalContainer"}>
                                    <StreamsModal donations={donations} charityStreamers={charityStreamers} change={closeModal} onStream={onStream} offStream={offStream} token={token}/>
                                </div>
                            </Modal>
                        </div>
                        <Routes>
                            <Route path="/" element={<HomePage />}/>
                            <Route path="/Streams"
                                   element={<StreamOnLayout token={token} offStream={offStream} onStream={onStream} change={refresh}/>}/>
                            <Route path="/Clips" element={<ClipsLayout change={refresh} team={charityStreamers} token={token}/>}/>
                            <Route path="/Stream" element={<Player change={refresh} team={charityStreamers} token={token}/>}/>
                            <Route path="/OoqZvHhdnIrOGL" element={<PersonalBar  donations={donations} charityStreamers={charityStreamers} onStream={false} token={token} />}/>
                        </Routes>
                        {/*<Partners cookies={cookies}/>*/}
                        <Footer/>
                    </BrowserRouter>
            </div>
        </>
    );
}

export default App;