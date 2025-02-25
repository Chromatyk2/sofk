import React, {useEffect, useState} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import ClipsPaginate from "./ClipsPaginate";
import UniqueStreamerClip from "./uniqueStreamerClip";
import UniqueStreamerMozaique from "./UniqueStreamerMozaique";
import Login from "../services/auth.services";
import '../App.css';

function ClipsLayout(props) {
    const [cookies, setCookie] = useCookies();
    const [clips, setClips] = useState([]);
    const [filteredClips, setFilteredClips] = useState([]);
    const [filteredClipsByStreamer, setFilteredClipsByStreamer] = useState([]);
    const [selectedStreamer, setSelectedStreamer] = useState(null);
    const [selectedDate, setSelectedDate] = useState("all");
    const [clipStreamer, setClipStreamer] = useState([]);
    const [emptyClips, setEmptyClips] = useState(false);
    useEffect(() => {
        if(props.team == 0){
            props.change();
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
                setClipStreamer(
                    Array.from(new Set(response.data.data.map(a => a.broadcaster_name)))
                        .map(id => {
                            return response.data.data.find(a => a.broadcaster_name === id)
                        })
                )
                response.data.data.map((val, key) => {
                    setClips(oldArrayOn => [...oldArrayOn, val]);
                })
            })
        })
    }, [props.team]);
    function handleDate(data) {
        const date = data.target.value;
        setSelectedDate(date);
        if(data.target.value != "all"){
            if(filteredClipsByStreamer.length > 0){
                if(clips.filter(item => item.created_at.includes(date)).filter((item => item.broadcaster_name.includes(selectedStreamer))).length > 0){
                    setEmptyClips(false)
                    setFilteredClipsByStreamer(clips.filter(item => item.created_at.includes(date)).filter((item => item.broadcaster_name.includes(selectedStreamer))))
                }else{
                    setEmptyClips(true)
                }
            }else{
                setEmptyClips(false)
                setFilteredClips(clips.filter(item => item.created_at.includes(date)))
            }
        }else{
            if(filteredClipsByStreamer.length > 0){
                setEmptyClips(false)
                setFilteredClipsByStreamer(clips.filter((item => item.broadcaster_name.includes(selectedStreamer))))
            }else{
                setEmptyClips(false)
                setFilteredClips([])
                setFilteredClipsByStreamer([])
            }
        }
    }
    function handleStreamer(data) {
        const pseudo = data.target.value;
        setSelectedStreamer(pseudo);
        if(data.target.value != "all"){
            if(filteredClips.length > 0){
                if(clips.filter(item => item.created_at.includes(selectedDate)).filter((item => item.broadcaster_name.includes(pseudo))).length > 0){
                    setEmptyClips(false)
                    setFilteredClipsByStreamer(clips.filter(item => item.created_at.includes(selectedDate)).filter((item => item.broadcaster_name.includes(pseudo))))
                }else{
                    setEmptyClips(true)
                }
            }else{
                setEmptyClips(false)
                setFilteredClipsByStreamer(clips.filter(item => item.broadcaster_name.includes(pseudo)))
            }
        }else{
            if(filteredClips.length > 0){
                setEmptyClips(false)
                setFilteredClipsByStreamer(clips.filter((item => item.created_at.includes(selectedDate))))
            }else{
                setEmptyClips(false)
                setFilteredClips([])
                setFilteredClipsByStreamer([])
            }
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
                        <button onClick={handleDate} value={"all"} className={selectedDate === "all" ? "buttonStreamers filterClipButton selected" : "buttonStreamers filterClipButton"}>Tous</button>
                        <button onClick={handleDate} value={"2024-05-23"} className={selectedDate === "2024-05-23" ? "buttonStreamers filterClipButton selected" : "buttonStreamers filterClipButton"}>Jour 1</button>
                        <button onClick={handleDate} value={"2024-05-24"} className={selectedDate === "2024-05-24" ? "buttonStreamers filterClipButton selected" : "buttonStreamers filterClipButton"}>Jour 2</button>
                        <button onClick={handleDate} value={"2024-05-25"} className={selectedDate === "2024-05-25" ? "buttonStreamers filterClipButton selected" : "buttonStreamers filterClipButton"}>Jour 3</button>
                    </div>
                    <select style={{display:"block", margin:"auto", marginBottom:"15px", }} onChange={handleStreamer}>
                        <option style={{textAlign:"center"}} value={"all"}>Tous</option>
                        {clips.map(e => e['broadcaster_name'])
                            .map((e, i, final) => final.indexOf(e) === i && i)
                            .filter(e => clips[e]).map(e => clips[e])
                            .sort((a, b) => (a.broadcaster_name > b.broadcaster_name) ? 1 : -1)
                            .map((val, key) => {
                                return (<option style={{textAlign:"center"}} value={val.broadcaster_name}>{val.broadcaster_name}</option>)
                            })}
                    </select>
                    {emptyClips === true ?
                        <p>Il n'y a pas de clips correspondants</p>
                        :
                        <ClipsPaginate
                            itemsPerPage={32}
                            items={filteredClipsByStreamer.length > 0 ? filteredClipsByStreamer.sort((a, b) => (a.view_count < b.view_count) ? 1 : -1) : filteredClips.length > 0 ? filteredClips.sort((a, b) => (a.view_count < b.view_count) ? 1 : -1) : clips.sort((a, b) => (a.view_count < b.view_count) ? 1 : -1)}
                        />
                    }
                </>
            }
        </>
    )
}

export default ClipsLayout;