import React,{useState, useEffect} from 'react';
import {useCookies} from "react-cookie";
import UniqueStreamer from './uniqueStreamer.js';
import UniqueStreamerMozaique from './UniqueStreamerMozaique.js';
import Login from "../services/auth.services";
import UniqueStreamerModal from "./UniqueStreamerModal";

function StreamsModal(props) {

    function handleDataFromChild(data) {
        props.change();
    }
    return (
            <>
                {
                    props.onStream.map((val, key) => {
                        return (
                            <UniqueStreamerModal change={handleDataFromChild} onStream={true} streamer={val} token={props.token}/>
                        )
                    })
                }
                {
                    props.offStream.map((val, key) => {
                        return (
                            <UniqueStreamerModal change={handleDataFromChild} onStream={false} streamer={val} token={props.token}/>
                        )
                    })
                }
            </>
    )
        ;
}

export default StreamsModal;
