import React,{useState, useEffect} from 'react';
import logoTwitch from '../twitch.png'
import logoReplay from '../film.png'
import logoEuro from '../euro.png'


function Player(props) {
    const [streamer, setStreamer] = React.useState(null);
    const queryParameters = new URLSearchParams(window.location.search)
    const streamerUrl = queryParameters.get('streamer')
    useEffect(() => {
        setStreamer(streamerUrl)
    }, [streamerUrl]);
    return (
        <>
            {streamer &&
                <div>
                    <h1 style={{marginTop:"30px", textAlign:"center", color:"white"}}>{streamer}</h1>
                    <div style={{marginTop:"30px"}} className="twitch">
                        <div className="twitch-video">
                            <iframe
                                src={"https://player.twitch.tv/?channel="+streamer+"&parent=preview--streamonforkids.netlify.app&autoplay=true&muted=false"}
                                frameBorder="0"
                                scrolling="no"
                                allowFullScreen="true"
                                height="720"
                                width="1280">
                            </iframe>
                        </div>
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "50px",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        marginTop: "20px"
                    }}>
                        <a href={"https://streamlabs.com/" + streamer + "/tip"} target={"_blank"}
                           className={"linkUnderStream"}>
                            <div>
                                <img className={"linkUnderStreamImg"} src={logoEuro}/>
                            </div>
                            <div style={{width: "300px"}}>
                                <p className={"linkUnderStreamTxt"}><span
                                    style={{fontSize: "20px", fontWeight: "bold"}}>Faire un don ! </span><br/>Soutien le
                                    116 000 avec un don, le moindre euro compte !</p>
                            </div>
                        </a>
                        <a href={"https://twitch.tv/"+streamer} target={"_blank"}
                           className={"linkUnderStream"}>
                            <div>
                                <img className={"linkUnderStreamImg"} src={logoTwitch}/>
                            </div>
                            <div style={{width: "300px"}}>
                                <p className={"linkUnderStreamTxt"}><span
                                    style={{fontSize: "20px", fontWeight: "bold"}}>Viens sur Twitch !</span><br/>Rejoins nous sur Twitch pour discuter !</p>
                            </div>
                        </a>
                    </div>
                </div>
            }
        </>
    );
}

export default Player;
