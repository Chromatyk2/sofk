import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";

function UniqueStreamer(props) {
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
    return (
        <>
            {user &&
                <>
                    <div onClick={changeStream} className="uniqueStreamer">
                        {props.onStream === true ?
                            <>
                                <div className={"uniqueStreamerOnline"}>
                                    <button className={"buttonToDisplayStream"} value={props.streamer.infos[0].user_name} onClick={changeStream}></button>
                                    <div className={"uniqueStreamerProfile"}>
                                        <img src={user.data[0].profile_image_url}/>
                                        <p>{props.streamer.infos[0].user_name}</p>
                                    </div>
                                    <div className={"uniqueStreamerStats"}>
                                        <img src={"/images/redCircle.png"}/>
                                        <p>{props.streamer.infos[0].viewer_count}</p>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className={"uniqueStreamerOnline"}>
                                    <button className={"buttonToDisplayStream"} value={props.streamer} onClick={changeStream}></button>
                                    <div className={"uniqueStreamerProfile"}>
                                        <img style={{width: "50px", margin: "0"}} src={user.data[0].profile_image_url}/>
                                        <p>{props.streamer}</p>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </>
            }
        </>
    );
}

export default UniqueStreamer;
