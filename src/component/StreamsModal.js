import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import UniqueStreamer from './uniqueStreamer.js';
import UniqueStreamerMozaique from './UniqueStreamerMozaique.js';
import Login from "../services/auth.services";
import UniqueStreamerModal from "./UniqueStreamerModal";

function StreamsModal(props) {
    const [cookies, setCookie] = useCookies();
    const [streamToDisplay, setStreamToDisplay] = useState();
    const [team, setTeam] = useState([]);
    const [onStream, setOnStream] = useState([]);
    const [orderedOnStream, setOrderedOnStream] = useState([]);
    const [offStream, setOffStream] = useState([]);

    function handleDataFromChild(data) {
        props.change();
    }
    function disableStream() {
        setStreamToDisplay(null);
    }
    return (
            <>
                {
                    props.onStream.map((val, key) => {
                        return (
                            <UniqueStreamerModal change={handleDataFromChild} onStream={true} streamer={val}/>
                        )
                    })
                }
                {
                    props.offStream.map((val, key) => {
                        return (
                            <UniqueStreamerModal change={handleDataFromChild} onStream={false} streamer={val}/>
                        )
                    })
                }
            </>
    )
        ;
}

export default StreamsModal;
