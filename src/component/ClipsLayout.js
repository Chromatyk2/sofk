import React, {useEffect, useState} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import ClipsPaginate from "./ClipsPaginate";
import UniqueStreamerClip from "./uniqueStreamerClip";
import UniqueStreamerMozaique from "./UniqueStreamerMozaique";
import Login from "../services/auth.services";

function ClipsLayout() {
    const [cookies, setCookie] = useCookies();
    const [team, setTeam] = useState([]);
    const [clips, setClips] = useState([]);
    const [onStream, setOnStream] = useState([]);
    const [orderedOnStream, setOrderedOnStream] = useState([]);
    const [offStream, setOffStream] = useState([]);
    const [showStreamerList, setShowStreamerList] = useState(false);
    useEffect(() => {
        Axios.get(
            'https://api.twitch.tv/helix/teams?name=streamon',
            {
                headers: {
                    'Authorization': `Bearer ${props.token}`,
                    'Client-Id': process.env.REACT_APP_CLIENT_ID
                }
            }
        ).then(function (response) {
            if(response.status == 200) {
                setTeam(response.data.data[0].users);
                response.data.data[0].users.map((val, key) => {
                    Axios.get(
                        'https://api.twitch.tv/helix/clips?started_at=2024-05-22T00:00:00Z&ended_at=2024-05-25T23:00:00Z&first=100&broadcaster_id=' + val.user_id,
                        {
                            headers: {
                                'Authorization': `Bearer ${props.token}`,
                                'Client-Id': process.env.REACT_APP_CLIENT_ID
                            }
                        }
                    ).then(function (response) {
                        response.data.data.map((val, key) => {
                            setClips(oldArrayOn => [...oldArrayOn, val]);
                        })
                    })
                })
            }else{
                return <Login />
            }
        })
    }, [])
    useEffect(() => {
        Axios.get(
            'https://api.twitch.tv/helix/teams?name=streamon',
            {
                headers: {
                    'Authorization': `Bearer ${props.token}`,
                    'Client-Id': process.env.REACT_APP_CLIENT_ID
                }
            }
        ).then(function (response) {
            setTeam(response.data.data[0].users);
            response.data.data[0].users.map((val, key) => {
                Axios.get(
                    'https://api.twitch.tv/helix/streams?user_login=' + val.user_name,
                    {
                        headers: {
                            'Authorization': `Bearer ${props.token}`,
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
        })
    }, [])
    function handleDataFromChild(data) {
        setShowStreamerList(false);
        setClips([]);
            Axios.get(
                'https://api.twitch.tv/helix/clips?started_at=2024-05-22T00:00:00Z&ended_at=2024-05-25T23:00:00Z&first=100&&broadcaster_id='+data,
                {
                    headers: {
                        'Authorization': `Bearer ${props.token}`,
                        'Client-Id': process.env.REACT_APP_CLIENT_ID
                    }
                }
            ).then(function (response) {
                response.data.data.map((val, key) => {
                    setClips(oldArrayOn => [...oldArrayOn, val]);
                })
            })
    }
    function handleStreamerList() {
        setShowStreamerList(true);
    }
    function disableStreamerList() {
        setShowStreamerList(false);
    }
    useEffect(() => {
        setOrderedOnStream(onStream.sort((a, b) => (a.infos[0].viewer_count < b.infos[0].viewer_count) ? 1 : -1));
    }, [onStream.length + offStream.length == team.length]);
    return (
        <>
            {showStreamerList === false &&
                    <div onClick={handleStreamerList} className={"showStreamerListButton"}>
                        <i className="fa-solid fa-people-group"></i>
                    </div>
                }
            {showStreamerList === true &&
                <div className={"streamersListClips"}>
                    <button className={"disableStreamerListButton"} onClick={disableStreamerList}>X</button>
                    {orderedOnStream.length > 0 &&
                        onStream.map((val, key) => {
                            return (
                                <UniqueStreamerClip change={handleDataFromChild} onStream={true} streamer={val}/>
                            )
                        })
                    }
                    {offStream.length > 0 &&
                        offStream.map((val, key) => {
                            return (
                                <UniqueStreamerClip change={handleDataFromChild} onStream={false} streamer={val}/>
                            )
                        })
                    }
                </div>

            }
            {clips.length > 0 &&
                <ClipsPaginate
                    itemsPerPage={32}
                    items={clips}
                />
            }
        </>
    )
}

export default ClipsLayout;
