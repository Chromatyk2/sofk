import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import {BrowserRouter, Link} from "react-router-dom";
import {ca} from "date-fns/locale";
import donationGoal from '../donationGoal.json'

function UniqueStreamerModal(props) {
    const [cookies, setCookie] = useCookies();
    const [user, setUser] = useState(null);
    const [data, setData] = useState("");
    const [cagnotte, setCagnotte] = useState([]);
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
        }
    }
    useEffect(() => {
        if(props.onStream === true){
            var streamerName = props.streamer.infos[0].user_name;
            if(props.donations.length>0){
                props.donations.filter(donation => donation.member != null).filter(donation => donation.member.user.display_name == streamerName).map((val, key) => {
                    setCagnotte(oldCagnotte => [...oldCagnotte, val.donation.original_amount]);
                });
            }
            if(donationGoal[streamerName.toLowerCase()] != undefined){
                setDonation(donationGoal[streamerName.toLowerCase()])
            }
        }else{
            var streamerName = props.streamer;
            if(props.donations.length>0) {
                props.donations.filter(donation => donation.member != null).filter(donation => donation.member.user.display_name == streamerName).map((val, key) => {
                    setCagnotte(oldCagnotte => [...oldCagnotte, val.donation.original_amount]);
                });
            }
            console.log(streamerName)
            if(donationGoal[streamerName.toLowerCase()] != undefined){
                setDonation(donationGoal[streamerName.toLowerCase()])
            }
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
                            <Link onClick={handleState} className="navLink linkFromNav"
                                  to={"/stream?streamer=" + props.streamer.infos[0].user_name}>
                                <div className={"uniqueStreamerOnline"}>
                                    <button className={"buttonToDisplayStream"}
                                            value={props.streamer.infos[0].user_name} onClick={changeStream}></button>
                                    <div className={"uniqueStreamerProfile"}>
                                        <div style={{width: "50px"}}>
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
                                <p style={{
                                    fontSize: "13px",
                                    textAlign: "right",
                                    margin: 0
                                }}>
                                    {donation.length > 0 ? donation.filter(item => item.montant >= cagnotte.reduce((a, v) => a = a + v, 0) / 100).length > 0 ? donation.filter(item => item.montant >= cagnotte.reduce((a, v) => a = a + v, 0) / 100)[0].montant + " €" : "Plus de donations goal ! Merci !" : "Plus de donations goal ! Merci !"}
                                </p>
                                <div style={customStyles.extBar} className="fullProgressBar">
                                    <div
                                        style={{
                                            width: donation.length > 0 ? donation.filter(item => item.montant >= cagnotte.reduce((a, v) => a = a + v, 0) / 100).length > 0 ? parseFloat(cagnotte.reduce((a, v) => a = a + v, 0) / donation.filter(item => item.montant >= cagnotte.reduce((a, v) => a = a + v, 0) / 100)[0].montant).toFixed(2) + "%" : "100%" : "100%",
                                            position: 'relative',
                                            textWrap: 'nowrap',
                                            color: 'white',
                                            padding: '15px',
                                            borderRadius: '50px 50px 50px 50px',
                                            height: "30px",
                                            lineHeight: 0,
                                            backgroundImage: "linear-gradient(180deg, #b27d0d 24%, #fcc249 155%)", textAlign:"center"
                                        }}>
                                        {cagnotte.reduce((a, v) => a = a + v, 0) / 100} €
                                    </div>
                                </div>
                            </Link>
                            :
                            <Link className="navLink linkFromNav" to={"/stream?streamer=" + props.streamer}>
                                <div className={"uniqueStreamerOnline"}>
                                    <button className={"buttonToDisplayStream"} value={props.streamer}
                                            onClick={changeStream}></button>
                                    <div className={"uniqueStreamerProfile"}>
                                        <div style={{width: "50px"}}>
                                            {user &&
                                                <img style={{width: "50px", margin: "0"}}
                                                     src={user.data[0].profile_image_url}/>
                                            }
                                        </div>
                                        <p>{props.streamer}</p>
                                    </div>
                                </div>
                                <p style={{
                                    fontSize: "13px",
                                    textAlign: "right",
                                    margin:0
                                }}>
                                    {donation.length > 0 ? donation.filter(item => item.montant >= cagnotte.reduce((a, v) => a = a + v, 0) / 100).length > 0 ? donation.filter(item => item.montant >= cagnotte.reduce((a, v) => a = a + v, 0) / 100)[0].montant + " €" : "Plus de donations goal ! Merci !" : "Plus de donations goal ! Merci !"}
                                </p>
                                <div style={customStyles.extBar} className="fullProgressBar">
                                    <div
                                        style={{
                                            width: donation.length > 0 ? donation.filter(item => item.montant >= cagnotte.reduce((a, v) => a = a + v, 0) / 100).length > 0 ? parseFloat(cagnotte.reduce((a, v) => a = a + v, 0) / donation.filter(item => item.montant >= cagnotte.reduce((a, v) => a = a + v, 0) / 100)[0].montant).toFixed(2) + "%" : "100%" : "100%",
                                            position: 'relative',
                                            textWrap: 'nowrap',
                                            color: 'white',
                                            padding: '15px',
                                            borderRadius: '50px 50px 50px 50px',
                                            height: "30px",
                                            lineHeight: 0,
                                            backgroundImage: "linear-gradient(180deg, #b27d0d 24%, #fcc249 155%)", textAlign:"center"
                                        }}>
                                        {cagnotte.reduce((a, v) => a = a + v, 0) / 100} €
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
