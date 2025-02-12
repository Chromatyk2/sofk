import React, {useEffect, useState} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import ClipsPaginate from "./ClipsPaginate";
import UniqueStreamerClip from "./uniqueStreamerClip";
import UniqueStreamerMozaique from "./UniqueStreamerMozaique";
import Login from "../services/auth.services";

function ClipsLayout(props) {
    const [cookies, setCookie] = useCookies();
    const [clips, setClips] = useState([]);

    useEffect(() => {
        if(props.team == 0){
            props.change();
        }else{
            const interval = setInterval(
                () => props.change(), 120000
            );
            return () => {
                clearInterval(interval);
            };
        }
    }, []);
    useEffect(() => {
        props.team.map((val, key) => {
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
    }, [props.team]);
    function handleDataFromChild(data) {
        setClips([]);
            Axios.get(
                'https://api.twitch.tv/helix/clips?started_at=2024-05-22T00:00:00Z&ended_at=2024-05-25T23:00:00Z&first=100&&broadcaster_id='+data,
                {
                    headers: {
                        'Authorization': `Bearer ${cookies.token.access_token}`,
                        'Client-Id': process.env.REACT_APP_CLIENT_ID
                    }
                }
            ).then(function (response) {
                response.data.data.map((val, key) => {
                    setClips(oldArrayOn => [...oldArrayOn, val]);
                })
            })
    }
    return (
        <>
            {/*{showStreamerList === false &&*/}
            {/*        <div onClick={handleStreamerList} className={"showStreamerListButton"}>*/}
            {/*            <i className="fa-solid fa-people-group"></i>*/}
            {/*        </div>*/}
            {/*    }*/}
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
