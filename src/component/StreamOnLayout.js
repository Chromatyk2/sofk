import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import UniqueStreamer from './uniqueStreamer.js';
import UniqueStreamerMozaique from './UniqueStreamerMozaique.js';
import Login from "../services/auth.services";

function StreamOnLayout(props) {
    return (
        <div className={"containerStream"}>
                <>
                    <div className={"streamerMozaique"}>
                        {
                            props.onStream.map((val, key) => {
                                return (
                                    <UniqueStreamerMozaique change={handleDataFromChild} onStream={true}
                                                            streamer={val} token={props.token}/>
                                )
                            })
                        }
                        {
                            props.offStream.map((val, key) => {
                                return (
                                    <UniqueStreamerMozaique change={handleDataFromChild} onStream={false} streamer={val} token={props.token}/>
                                )
                            })
                        }
                    </div>
                </>
        </div>
    )
        ;
}

export default StreamOnLayout;
