import React,{useState, useEffect} from 'react';
import logoTwitch from '../twitch.png'
import logoReplay from '../film.png'
import logoEuro from '../euro.png'
import '../Component.css';
import donationGoal from "../donationGoal.json";


function Player(props) {
    const [streamer, setStreamer] = React.useState(null);
    const queryParameters = new URLSearchParams(window.location.search)
    const streamerUrl = queryParameters.get('streamer')
    const [cagnotte, setCagnotte] = useState(0);
    const [donation, setDonation] = useState([]);
    const customStyles = {
        extBar: {
            width: "100%",
            backgroundColor: "rgb(50, 82, 105)",
            position: "relative",
            zIndex: 1,
            borderRadius: "50px",
            margin: 0,
            height: "30px"
        },
        extBarMobile: {
            width: "50%",
            backgroundColor: "rgb(50, 82, 105)",
            position: "relative",
            zIndex: 1,
            borderRadius: "50px",
            height: "30px",
            display:"block",
            margin:"auto"
        }
    }

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        var streamerName = queryParameters.get("streamer");
        if (donationGoal[streamerName.toLowerCase()] != undefined) {
            setDonation(donationGoal[streamerName.toLowerCase()])
        }
    }, [])
    useEffect(() => {
        const interval = setInterval(() =>
            {
                setCagnotte(prevCount => prevCount + Math.floor(Math.random() * 100))
            },1000
        );
        return () => {
            clearInterval(interval);
        };
    }, [])
    useEffect(() => {
        setStreamer(streamerUrl)
    }, [streamerUrl]);
    return (
        <>
            {streamer &&
                <div>
                    <h1 style={{marginTop: "30px", textAlign: "center", color: "white"}}>{streamer}</h1>
                    <div class={"donationBarMobile"} style={customStyles.extBarMobile} className="fullProgressBar">
                        <div
                            className={"intBar"}
                            style={{
                                width: donation.filter(item => item.montant >= cagnotte).length > 0 ? parseFloat((cagnotte / donation.filter(item => item.montant >= cagnotte)[0].montant) * 100).toFixed(2) + "%" : "100%",
                                position: 'relative',
                                textWrap: 'nowrap',
                                color: 'white',
                                padding: '15px',
                                borderRadius: '50px 50px 50px 50px',
                                height: "30px",
                                lineHeight: 0,
                                backgroundImage: "linear-gradient(180deg, #b27d0d 24%, #fcc249 155%)",
                                textAlign: "center"
                            }}>
                            {cagnotte} €
                        </div>
                    </div>
                    <div style={{marginTop: "30px"}} className="twitch">
                        <div className="twitch-video">
                            <iframe
                                src={"https://player.twitch.tv/?channel=" + streamer + "&parent=preview--streamonforkids.netlify.app&autoplay=true&muted=false"}
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
                    </div>
                </div>
            }
            <div className={"personalBarContainerPlayer"}>
                <img style={{width: "200px", position: "relative", top: "-87px", marginBottom: "-80px"}}
                     src={"images/logoSofk.png"}/>
                {donation.filter(item => item.montant >= cagnotte).length > 0 ?
                    <>
                        <p style={{color: "white", fontSize: "25px", textAlign: "center"}}>Prochain donation Goal</p>
                        <p style={{fontSize: "50px", textAlign: "center", color: "#fcc249"}}>
                            {donation.filter(item => item.montant >= cagnotte)[0].montant + " €"}
                        </p>
                        <p style={{fontSize: "20px", textAlign: "center", color: "white"}}>
                            {donation.filter(item => item.montant >= cagnotte).length > 0 && donation.filter(item => item.montant >= cagnotte)[0].description}
                        </p>
                    </>
                    :
                    <p style={{fontSize: "25px", textAlign: "center", color: "#fcc249"}}>
                        Plus de donations goal ! Merci !
                    </p>
                }
                <div style={customStyles.extBar} className="fullProgressBar">
                    <div
                        className={"intBar"}
                        style={{
                            width: donation.filter(item => item.montant >= cagnotte).length > 0 ? parseFloat((cagnotte / donation.filter(item => item.montant >= cagnotte)[0].montant) * 100).toFixed(2) + "%" : "100%",
                            position: 'relative',
                            textWrap: 'nowrap',
                            color: 'white',
                            padding: '15px',
                            borderRadius: '50px 50px 50px 50px',
                            height: "30px",
                            lineHeight: 0,
                            backgroundImage: "linear-gradient(180deg, #b27d0d 24%, #fcc249 155%)", textAlign: "center"
                        }}>
                        {cagnotte} €
                    </div>
                </div>
            </div>
        </>
    );
}

export default Player;
