import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";

function UniqueStreamerMozaique(props) {
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
                    <div onClick={changeStream} className="uniqueStreamerMozaique">
                        {props.onStream === true ?
                            <>
                                <div style={{backgroundRepeat:"no-repeat",backgroundImage:"url(https://static-cdn.jtvnw.net/previews-ttv/live_user_"+props.streamer.infos[0].user_name.toLowerCase()+"-496x279.jpg)"}} className={"uniqueStreamerOnlineMozaique"}>
                                    <button className={"buttonToDisplayStreamMozaique"} value={props.streamer.infos[0].user_name} onClick={changeStream}></button>
                                    <div className={"uniqueStreamerProfileMozaique"}>
                                        <img src={user.data[0].profile_image_url}/>
                                        <p>{props.streamer.infos[0].user_name}</p>
                                    </div>
                                    <div className={"uniqueStreamerStatsMozaique"}>
                                        <img src={"/images/redCircle.png"}/>
                                        <p>{props.streamer.infos[0].viewer_count}</p>
                                    </div>
                                </div>
                            </>
                            :
                            <>

                                <div style={ { backgroundImage: user.data[0].offline_image_url ? 'url('+user.data[0].offline_image_url+')' : 'url('+user.data[0].profile_image_url+')',backgroundRepeat:"no-repeat",backgroundSize:"cover" } }
                                     className={"uniqueStreamerOnlineMozaique"}>
                                    <button className={"buttonToDisplayStreamMozaique"} value={props.streamer} onClick={changeStream}></button>
                                    <div className={"uniqueStreamerProfileMozaique"}>
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

export default UniqueStreamerMozaique;
