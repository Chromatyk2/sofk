import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import UniqueStreamer from './uniqueStreamer.js';
import UniqueStreamerMozaique from './UniqueStreamerMozaique.js';
import Login from "../services/auth.services";

function StreamOnLayout() {
    const [cookies, setCookie] = useCookies();
    const [streamToDisplay, setStreamToDisplay] = useState();
    const [team, setTeam] = useState([]);
    const [onStream, setOnStream] = useState([]);
    const [orderedOnStream, setOrderedOnStream] = useState([]);
    const [offStream, setOffStream] = useState([]);
    const [charityTeam, setCharityTeam] = useState([]);
    useEffect(() => {
        Axios.get(
            'https://streamlabscharity.com/api/v1/teams/643437249115068091'
        ).then(function (response) {
            console.log(response.data.members);
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

    function handleDataFromChild(data) {
        setStreamToDisplay(data);
    }
    function disableStream() {
        setStreamToDisplay(null);
    }
    return (
        <div className={"containerStream"}>
            <div className={"streamersList"}>
                <p className={"streamTitle"}>Streameur.euses</p>
                <hr style={{width: "50%", display: "block", margin: "auto", border: "1px solid #f7bb3e"}}/>
                {orderedOnStream.length > 0 &&
                    onStream.map((val, key) => {
                        return (
                            <UniqueStreamer change={handleDataFromChild} onStream={true} streamer={val}/>
                        )
                    })
                }
                {offStream.length > 0 &&
                    offStream.map((val, key) => {
                        return (
                            <UniqueStreamer change={handleDataFromChild} onStream={false} streamer={val}/>
                        )
                    })
                }
            </div>

            {streamToDisplay ?
                <>
                    <button onClick={disableStream} className={"disableStream"}>X</button>
                    <div className="twitch">
                        <div className="twitch-video">
                            <iframe
                                src={"https://player.twitch.tv/?channel=" + streamToDisplay + "&parent=streamonforkids.fr&autoplay=true&muted=false"}
                                frameBorder="0"
                                scrolling="no"
                                allowFullScreen="true"
                                height="720"
                                width="1280">
                            </iframe>
                        </div>
                        <div className="twitch-chat">
                            <iframe
                                frameBorder="0"
                                scrolling="no"
                                src={"https://www.twitch.tv/embed/" + streamToDisplay + "/chat?parent=streamonforkids.fr"}
                                height="100%"
                                width="100%">
                            </iframe>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className={"streamerMozaique"}>
                        {orderedOnStream.length > 0 &&
                            onStream.map((val, key) => {
                                return (
                                    <UniqueStreamerMozaique change={handleDataFromChild} onStream={true}
                                                            streamer={val}/>
                                )
                            })
                        }
                        {offStream.length > 0 &&
                            offStream.map((val, key) => {
                                return (
                                    <UniqueStreamerMozaique change={handleDataFromChild} onStream={false} streamer={val}/>
                                )
                            })
                        }
                    </div>
                    <div className={"streamersListMobile"}>
                        <p className={"streamTitle"}>Streameur.euses</p>
                        <hr style={{width: "50%", display: "block", margin: "auto", border: "1px solid #f7bb3e"}}/>
                        {orderedOnStream.length > 0 &&
                            onStream.map((val, key) => {
                                return (
                                    <UniqueStreamer change={handleDataFromChild} onStream={true} streamer={val}/>
                                )
                            })
                        }
                        {offStream.length > 0 &&
                            offStream.map((val, key) => {
                                return (
                                    <UniqueStreamer change={handleDataFromChild} onStream={false} streamer={val}/>
                                )
                            })
                        }
                    </div>
                </>
            }

        </div>
    )
        ;
}

export default StreamOnLayout;
