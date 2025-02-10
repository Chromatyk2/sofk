import React,{useState, useEffect} from 'react';
import logoTwitch from '../twitch.png'
import logoReplay from '../film.png'
import logoEuro from '../euro.png'


function Player(props) {
    const [streamer, setStreamer] = React.useState(null);
    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const streamerUrl = queryParameters.get('streamer')
        setStreamer(streamerUrl)
    }, []);
    return (
        <>
            {streamer &&
                <>
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
                        <div className="twitch-chat">
                            <iframe
                                frameBorder="0"
                                scrolling="no"
                                src={"https://www.twitch.tv/embed/" + streamer + "/chat?parent=preview--streamonforkids.netlify.app"}
                                height="100%"
                                width="100%">
                            </iframe>
                        </div>
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "50px",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        marginTop: "50px"
                    }}>
                        <a href={"https://www.twitch.tv/meetup_tv"} target={"_blank"} className={"linkUnderStream"}>
                            <div>
                                <img className={"linkUnderStreamImg"} src={logoTwitch}/>
                            </div>
                            <div style={{width: "300px"}}>
                                <p className={"linkUnderStreamTxt"}><span style={{fontSize: "20px", fontWeight: "bold"}}>Abonne-toi ! </span><br/> Abonne-toi à
                                    la chaine pour nous soutenir et obtenir pleins d'avantages ! Fait partis de la MeetUp Family ! </p>
                            </div>
                        </a>
                        <a href={"https://www.twitch.tv/meetup_tv/videos"} target={"_blank"} className={"linkUnderStream"}>
                            <div>
                                <img className={"linkUnderStreamImg"} src={logoReplay}/>
                            </div>
                            <div style={{width: "300px"}}>
                                <p className={"linkUnderStreamTxt"}><span style={{fontSize: "20px", fontWeight: "bold"}}>Les VODs </span><br/> T'as raté un
                                    stream ? Pas grave viens regarder les vods en accès immédiat après chaque stream !</p>
                            </div>
                        </a>
                        <a href={"https://streamlabs.com/meetup_tv/tip"} target={"_blank"} className={"linkUnderStream"}>
                            <div>
                                <img className={"linkUnderStreamImg"} src={logoEuro}/>
                            </div>
                            <div style={{width: "300px"}}>
                                <p className={"linkUnderStreamTxt"}><span style={{fontSize: "20px", fontWeight: "bold"}}>Soutiens nous ! </span><br/>MeetUpTV est une assocition a but non lucratif, chaque dons nous aide à créer de nouveau projets !</p>
                            </div>
                        </a>
                    </div>
                    {/*<a href="https://twitter.com/share?url=<URL>&text=<TEXT>via=<USERNAME>">*/}
                    {/*    Twitter*/}
                    {/*</a>*/}
                    {/*<a href="https://www.facebook.com/sharer/sharer.php?u=<URL>">*/}
                    {/*    Facebook*/}
                    {/*</a>*/}
                    {/*<a href="https://reddit.com/submit?url=<URL>&title=<TITLE>">*/}
                    {/*    Reddit*/}
                    {/*</a>*/}
                    {/*<a href="https://news.ycombinator.com/submitlink?u=<URL>&t=<TITLE>">*/}
                    {/*    Hacker News*/}
                    {/*</a>*/}
                    {/*<a href="https://www.linkedin.com/shareArticle?url=<URL>&title=<TITLE>&summary=<SUMMARY>&source=<SOURCE_URL>">*/}
                    {/*    LinkedIn*/}
                    {/*</a>*/}
                    {/*<a href="mailto:?subject=<SUBJECT>&body=<BODY>">*/}
                    {/*    Email*/}
                    {/*</a>*/}
                </>
            }
        </>
    );
}

export default Player;
