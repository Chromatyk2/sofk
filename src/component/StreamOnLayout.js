import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import UniqueStreamer from './uniqueStreamer.js';
import UniqueStreamerMozaique from './UniqueStreamerMozaique.js';
import Login from "../services/auth.services";

function StreamOnLayout(props) {
    useEffect(() => {

        const interval = setInterval(
            () => props.change(), 120000
        );
        return () => {
            clearInterval(interval);
        };
    }, []);
    const [multiStream, setMultiStream] = useState([]);
    const [url, setUrl] = useState()
    function loadForMultiStream(data) {
        if(multiStream.find(streamer => streamer == data)){
            var array = [...multiStream]; // make a separate copy of the array
            var index = multiStream.indexOf(data)
            if (index !== -1) {
                array.splice(index, 1);
                setMultiStream(array);
            }
        }else{
            setMultiStream(oldArrayMulti => [...oldArrayMulti, data.toString()]);
        }
    }
    return (
        <div className={"containerStream"}>
                <>
                    <div className={"streamerMozaique"}>
                        {
                            Array.from(new Set(props.onStream)).sort((a, b) => (a.infos[0].viewer_count < b.infos[0].viewer_count) ? 1 : -1).map((val, key) => {
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
                    {multiStream.length > 0 &&
                        <a className={"runMultiStreamButton"} target="_blank" href={"https://www.multitwitch.tv/"+multiStream.join("/")}>Lancer le Multi Stream</a>
                    }
                </>
        </div>
    )
        ;
}

export default StreamOnLayout;
