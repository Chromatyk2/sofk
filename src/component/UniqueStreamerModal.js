import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import {BrowserRouter, Link} from "react-router-dom";

function UniqueStreamerModal(props) {
    const [cookies, setCookie] = useCookies();
    const [user, setUser] = useState(null);
    const [data, setData] = useState("");
    useEffect(() => {
        if(props.onStream === true){
            var streamerName = props.streamer.infos[0].user_name;
        }else{
            var streamerName = props.streamer;
        }
        Axios.get(
            'https://api.twitch.tv/helix/users?login='+streamerName,
            {
                headers:{
                    'Authorization': `Bearer ${props.token}`,
                    'Client-Id': process.env.REACT_APP_CLIENT_ID
                }
            }
        ).then(function(response){
            setUser(response.data);
        })
    }, [])
    function changeStream(e) {
        props.change(e.target.value);
    }
    function handleState() {
        props.change();
    }
    return (
        <>
                <>
                    <div onClick={changeStream} className="uniqueStreamer">
                        {props.onStream === true ?
                            <Link onClick={handleState} className="navLink linkFromNav" to={"/stream?streamer="+props.streamer.infos[0].user_name}>
                                <div className={"uniqueStreamerOnline"}>
                                    <button className={"buttonToDisplayStream"} value={props.streamer.infos[0].user_name} onClick={changeStream}></button>
                                    <div className={"uniqueStreamerProfile"}>
                                        <div style={{width:"50px"}}>
                                            {user &&
                                                <img src={user.data[0].profile_image_url}/>
                                            }
                                        </div>
                                        <p>{props.streamer.infos[0].user_name}</p>
                                    </div>
                                    <div className={"uniqueStreamerStats"}>
                                        <img src={"/images/redCircle.png"}/>
                                        <p>{props.streamer.infos[0].viewer_count}</p>
                                    </div>
                                </div>
                            </Link>
                            :
                            <Link className="navLink linkFromNav" to={"/stream?streamer="+props.streamer}>
                                <div className={"uniqueStreamerOnline"}>
                                    <button className={"buttonToDisplayStream"} value={props.streamer} onClick={changeStream}></button>
                                    <div className={"uniqueStreamerProfile"}>
                                        <div style={{width:"50px"}}>
                                            {user &&
                                                <img style={{width: "50px", margin: "0"}} src={user.data[0].profile_image_url}/>
                                            }
                                        </div>
                                        <p>{props.streamer}</p>
                                    </div>
                                </div>
                            </Link>
                        }
                    </div>
                </>
        </>
    );
}

export default UniqueStreamerModal;
