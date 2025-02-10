import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import UniqueStreamer from './uniqueStreamer.js';
import UniqueStreamerMozaique from './UniqueStreamerMozaique.js';
import Login from "../services/auth.services";
import UniqueStreamerModal from "./UniqueStreamerModal";
import Modal from "react-modal";
import StreamsModal from "./StreamsModal";
function ButtonToStreamers(props) {
    const [cookies, setCookie] = useCookies();
    const [streamToDisplay, setStreamToDisplay] = useState();
    const [team, setTeam] = useState([]);
    const [onStream, setOnStream] = useState([]);
    const [orderedOnStream, setOrderedOnStream] = useState([]);
    const [offStream, setOffStream] = useState([]);
    const [charityTeam, setCharityTeam] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
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

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    useEffect(() => {
        Axios.get(
            'https://streamlabscharity.com/api/v1/teams/643437249115068091'
        ).then(function (response) {
            response.data.members.map((val, key) => {
                setCharityTeam(oldArrayOn => [...oldArrayOn, {infos: val.user}]);
            })
        })
    }, []);
    useEffect(() => {
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
            }else{
                return <Login />
            }
        })
    }, [])
    useEffect(() => {
        setOrderedOnStream(onStream.sort((a, b) => (a.infos[0].viewer_count < b.infos[0].viewer_count) ? 1 : -1));
    }, [onStream.length + offStream.length == team.length]);

    return (
        <>
            {orderedOnStream.length > 0 &&
                offStream.length > 0 &&
                <div className={"buttonStreamsContainer"}>
                    <button onClick={openModal} className={"buttonStreamers"}>Streameur.euses</button>
                    <button className={"buttonStreamers"}>Boutique</button>
                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}
                           contentLabel="Example Modal">
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                            <p style={{color: "white"}}>Streameur.euses</p>
                            <button style={{color: "white", border: "none", background: "none"}} onClick={closeModal}>X
                            </button>
                        </div>
                        <div className={"streamsModalContainer"}>
                            <StreamsModal onStream={onStream} offStream={offStream} change={closeModal} cookies={cookies}/>
                        </div>
                    </Modal>
                </div>
            }
        </>
    )
        ;
}

export default ButtonToStreamers;