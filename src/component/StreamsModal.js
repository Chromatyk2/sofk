import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import UniqueStreamer from './uniqueStreamer.js';
import UniqueStreamerMozaique from './UniqueStreamerMozaique.js';
import Login from "../services/auth.services";
import UniqueStreamerModal from "./UniqueStreamerModal";

function StreamsModal(props) {

    const [cookies, setCookie] = useCookies();
    function handleDataFromChild(data) {
        props.change();
    }
    return (
            <>
                {cookies.orderedOnStream.length > 0 &&
                    cookies.onStream.map((val, key) => {
                        return (
                            <UniqueStreamerModal change={handleDataFromChild} onStream={true} streamer={val}/>
                        )
                    })
                }
                {cookies.offStream.length > 0 &&
                    cookies.offStream.map((val, key) => {
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
