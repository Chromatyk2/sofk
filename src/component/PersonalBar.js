import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import {BrowserRouter, Link} from "react-router-dom";
import {ca} from "date-fns/locale";
import donationGoal from '../donationGoal.json'
import '../Overlay.css'

function PersonalBar(props) {
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
        const queryParameters = new URLSearchParams(window.location.search)
        var streamerName = queryParameters.get("streamer");
        props.donations.filter(donation => donation.member != null).filter(donation => donation.member.user.display_name == streamerName).map((val, key) => {
            setCagnotte(oldCagnotte => [...oldCagnotte, val.donation.original_amount]);
        });
        if(donationGoal[streamerName.toLowerCase()] != undefined){
            setDonation(donationGoal[streamerName.toLowerCase()])
        }
    }, [])
    return (
        <>
            <p style={{
                fontSize: "13px",
                textAlign: "right",
                margin: 0
            }}>
                {donation.length > 0 ? donation.filter(item => item.montant >= cagnotte.reduce((a, v) => a = a + v, 0) / 100).length > 0 ? donation.filter(item => item.montant >= cagnotte.reduce((a, v) => a = a + v, 0) / 100)[0].montant : "Plus de donations goal ! Merci !" : "Plus de donations goal ! Merci !"}
            </p>
            <div style={customStyles.extBar} className="fullProgressBar">
                <div
                    style={{
                        width: donation.length > 0 ? donation.filter(item => item.montant >= cagnotte.reduce((a, v) => a = a + v, 0) / 100).length > 0 ? parseFloat(cagnotte.reduce((a, v) => a = a + v, 0) / donation.filter(item => item.montant >= cagnotte.reduce((a, v) => a = a + v, 0) / 100)[0].montant).toFixed(2) + "%" : "100%" : "100%",
                        position: 'relative',
                        textWrap: 'nowrap',
                        color: '#38617f',
                        padding: '15px',
                        borderRadius: '50px 50px 50px 50px',
                        height: "30px",
                        lineHeight: 0,
                        backgroundImage: "linear-gradient(180deg,#9ad4de 24%,#fff 155%)"
                    }}>
                    {cagnotte.reduce((a, v) => a = a + v, 0) / 100} €
                </div>
            </div>
        </>
    );
}

export default PersonalBar;
