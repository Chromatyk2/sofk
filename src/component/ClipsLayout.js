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
    const [filteredClips, setFilteredClips] = useState([]);

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
    function handleDate(data) {
        const date = data.target.value;
        const reg = new RegExp(date, /^date.*$/)
        if(data.target.value != "all"){
            setFilteredClips(clips.filter(item => item.created_at.match(reg)))
        }else{
            setFilteredClips([])
        }
    }
    return (
        <>
            {/*{showStreamerList === false &&*/}
            {/*        <div onClick={handleStreamerList} className={"showStreamerListButton"}>*/}
            {/*            <i className="fa-solid fa-people-group"></i>*/}
            {/*        </div>*/}
            {/*    }*/}
            <h1 style={{marginTop:"30px", textAlign:"center", color:"white"}}>Les clips</h1>
            {clips.length > 0 &&
                <>
                    <div style={{display:"flex", width:"300px", gap:"10px", margin:"auto", marginBottom:"30px"}}>
                        <button onClick={handleDate} value={"all"} className={"buttonStreamers"}>Tous</button>
                        <button onClick={handleDate} value={"2024-05-23"} className={"buttonStreamers"}>Jour 1</button>
                        <button onClick={handleDate} value={"2024-05-24"} className={"buttonStreamers"}>Jour 2</button>
                        <button onClick={handleDate} value={"2024-05-25"} className={"buttonStreamers"}>Jour 3</button>
                    </div>
                    <ClipsPaginate
                        itemsPerPage={32}
                        items={filteredClips.length > 0 ? filteredClips : clips}
                    />
                </>
            }
        </>
    )
}

export default ClipsLayout;
