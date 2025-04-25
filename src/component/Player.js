import React,{useState, useEffect} from 'react';
import logoTwitch from '../twitch.png'
import logoReplay from '../film.png'
import logoEuro from '../euro.png'
import '../Component.css';
import donationGoal from "../donationGoal.json";
import Axios from "axios";
import MarqueeText from "react-marquee-text";


function Player(props) {
    const [streamer, setStreamer] = React.useState(null);
    const queryParameters = new URLSearchParams(window.location.search)
    const streamerUrl = queryParameters.get('streamer')
    const [cagnotte, setCagnotte] = useState([]);
    const [donation, setDonation] = useState([]);
    const [donations, setDonations] = useState([]);
    const [load, setLoad] = useState(0);
    const [montant, setMontant] = useState(true);
    useEffect(() => {
        if(props.team.length == 0){
            props.change();
        }
    }, []);

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
        extBarInline: {
            width: "100%",
            backgroundColor: "rgb(50, 82, 105)",
            position: "relative",
            zIndex: 1,
            borderRadius: "10px",
            height: "37px",
            margin:"0",
        },
        extBarInlineCard: {
            width: "100%",
            backgroundColor: "rgb(50, 82, 105)",
            position: "relative",
            zIndex: 1,
            borderRadius: "10px",
            height: "37px",
            margin:"0",
            marginTop:"10px"
        }
    }


    useEffect(() => {
        const interval = setInterval(() =>
            {
                const queryParameters = new URLSearchParams(window.location.search);
                Axios.get('https://streamlabscharity.com/api/v1/teams/781834327792162028/donations')
                    .then(function (response) {
                        response.data.map((val, key) => {
                            setDonations(oldDonations => [...oldDonations, val]);
                        })
                        if (response.data.length == 500) {
                            Axios.get('https://streamlabscharity.com/api/v1/teams/781834327792162028/donations?page=1')
                                .then(function (response) {
                                    response.data.map((val, key) => {
                                        setDonations(oldDonations => [...oldDonations, val]);
                                    })
                                    if (response.data.length == 500) {
                                        Axios.get('https://streamlabscharity.com/api/v1/teams/781834327792162028/donations?page=2')
                                            .then(function (response) {
                                                response.data.map((val, key) => {
                                                    setDonations(oldDonations => [...oldDonations, val]);
                                                })
                                                if (response.data.length == 500) {
                                                    Axios.get('https://streamlabscharity.com/api/v1/teams/781834327792162028/donations?page=3')
                                                        .then(function (response) {
                                                            response.data.map((val, key) => {
                                                                setDonations(oldDonations => [...oldDonations, val]);
                                                            })
                                                        })
                                                }else{
                                                    setLoad(Math.random())
                                                }
                                            })
                                    }else{
                                        setLoad(Math.random())
                                    }
                                })
                        }else{
                            setLoad(Math.random())
                        }
                    })}
            ,1000
        );
        return () => {
            clearInterval(interval);
        };
    }, []);
    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        var streamerName = queryParameters.get("streamer");
        if (donationGoal[streamerName.toLowerCase()] != undefined) {
            setDonation(donationGoal[streamerName.toLowerCase()])
        }
    }, [])
    useEffect(() => {
        setDonations([]);
        setCagnotte([])
        const queryParameters = new URLSearchParams(window.location.search)
        var streamerName = queryParameters.get("streamer");
        donations.filter(donation => donation.member != null).filter(donation => donation.member.user.display_name == streamerName).map((val, key) => {
            setCagnotte(oldCagnotte => [...oldCagnotte, val.donation.original_amount]);
        });
        if (donationGoal[streamerName.toLowerCase()] != undefined) {
            setDonation(donationGoal[streamerName.toLowerCase()])
        }
    }, [load])
    useEffect(() => {
        setMontant(cagnotte.reduce((a, b) => a + b, 0) / 100)
    }, [cagnotte])
    useEffect(() => {
        setStreamer(streamerUrl)
    }, [streamerUrl]);
    return (
        <>
            {props.team.length > 0 &&
                streamer &&
                <h1 style={{marginTop: "30px", textAlign: "center", color: "white"}}>{streamer}</h1>
            }
            {props.team.length > 0 &&
                streamer &&
                <div>
                    <div style={{marginTop: "30px"}} className="twitch">
                        <div className="twitch-video">
                            <iframe
                                src={"https://player.twitch.tv/?channel=" + streamer + "&parent=streamonforkids.fr&autoplay=true&muted=false"}
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
                        <a href={"https://streamlabscharity.com/teams/@stream-on-for-kids-2025/stream-on-for-kids-2025?member=" + props.team.filter(item => item.user.display_name == streamer)[0].user.id + "&l=fr-FR"}
                           target={"_blank"}
                           className={"linkUnderStream"}>
                            <div>
                                <img className={"linkUnderStreamImg"} src={logoEuro}/>
                            </div>
                            <div style={{width: "300px"}}>
                                <p className={"linkUnderStreamTxt"}><span
                                    style={{
                                        fontSize: "20px",
                                        fontWeight: "bold"
                                    }}>Clique pour faire un don ! </span><br/>Soutien le
                                    116 000 avec un don, le moindre euro compte !</p>
                            </div>
                        </a>
                    </div>
                </div>
            }

                <div className={"personalBarContainerPlayer"}>
                    <img style={{width: "200px", position: "relative", top: "-87px", marginBottom: "-80px"}}
                         src={"images/logoSofk.png"}/>
                    {donation.filter(item => item.montant > montant).length > 0 ?
                        <>
                            <p style={{color: "white", fontSize: "25px", textAlign: "center"}}>Prochain donation
                                Goal</p>
                            <p style={{fontSize: "50px", textAlign: "center", color: "#fcc249"}}>
                                {donation.filter(item => item.montant > montant)[0].montant + " €"}
                            </p>
                            <MarqueeText duration={10} direction={"right"} textSpacing={"8em"}
                                         className={"scrollTextCard"}>
                                {donation.filter(item => item.montant > montant).length > 0 && donation.filter(item => item.montant > montant)[0].description}
                            </MarqueeText>
                            <div style={customStyles.extBarInlineCard} className="fullProgressBar">
                                <div
                                    className={"intBar"}
                                    style={{
                                        width: donation.filter(item => item.montant > montant).length > 0 ? parseFloat((montant / donation.filter(item => item.montant > montant)[0].montant) * 100).toFixed(2) + "%" : "100%",
                                        position: 'relative',
                                        textWrap: 'nowrap',
                                        color: 'white',
                                        padding: '15px',
                                        borderRadius: '10px 10px 10px 10px',
                                        height: "37px",
                                        lineHeight: 0,
                                        backgroundColor: "rgb(252, 194, 73)",
                                        textAlign: "left",
                                        margin: 0
                                    }}>
                                </div>
                                <p style={{
                                    fontSize: "28px",
                                    textAlign: "right",
                                    color: "white",
                                    position: "absolute",
                                    left: "12px",
                                    zIndex: 1,
                                    top: "0px"
                                }}>
                                    {montant} €
                                </p>
                                <p style={{
                                    fontSize: "28px",
                                    textAlign: "right",
                                    color: "white",
                                    position: "absolute",
                                    right: "12px",
                                    zIndex: 1,
                                    top: "0px"
                                }}>
                                    {donation.filter(item => item.montant > montant)[0].montant + " €"}
                                </p>
                            </div>
                        </>
                        :
                        <p style={{fontSize: "25px", textAlign: "center", color: "#fcc249"}}>
                            Plus de donations goal ! Merci !
                        </p>
                    }
                </div>
        </>
    );
}

export default Player;
