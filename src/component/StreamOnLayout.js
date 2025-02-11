import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import UniqueStreamer from './uniqueStreamer.js';
import UniqueStreamerMozaique from './UniqueStreamerMozaique.js';
import Login from "../services/auth.services";

function StreamOnLayout(props) {
    useEffect(() => {
        props.change();
    }, []);
    const [multiStream, setMultiStream] = useState([]);
    function loadForMultiStream(data) {
        setMultiStream(oldArrayMulti => [...oldArrayMulti, data]);
    }
    return (
        <div className={"containerStream"}>
                <>
                    <div className={"streamerMozaique"}>
                        {
                            props.onStream.map((val, key) => {
                                return (
                                    <UniqueStreamerMozaique change={loadForMultiStream} onStream={true} streamer={val} token={props.token}/>
                                )
                            })
                        }
                        {
                            props.offStream.map((val, key) => {
                                return (
                                    <UniqueStreamerMozaique change={loadForMultiStream} onStream={false} streamer={val} token={props.token}/>
                                )
                            })
                        }
                    </div>
                    <>
                        <a href={"https://multistre.am/"+multiStream.map((val, key) => {"/"+val})}>Lancer le Multi Stream</a>
                    </>
                </>
        </div>
    )
        ;
}

export default StreamOnLayout;
