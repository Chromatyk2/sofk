import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import {BrowserRouter, Link} from "react-router-dom";
import {ca} from "date-fns/locale";
import donationGoal from '../donationGoal.json'
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

function ListDonation(props) {
    const [cagnotte, setCagnotte] = useState([]);
    const [donation, setDonation] = useState([]);
    const [donations, setDonations] = useState([]);
    const [load, setLoad] = useState(0);
    const [montant, setMontant] = useState(true);
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
            width: "685px",
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
            ,6000
        );
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        setDonations([]);
        setCagnotte([])
        const queryParameters = new URLSearchParams(window.location.search)
        var streamerName = queryParameters.get("streamer");
        donations.filter(donation => donation.member != null).filter(donation => donation.member.user.display_name.toLowerCase() == streamerName.toLowerCase()).map((val, key) => {
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
        const queryParameters = new URLSearchParams(window.location.search);
        var streamerName = queryParameters.get("streamer");
        if (donationGoal[streamerName.toLowerCase()] != undefined) {
            setDonation(donationGoal[streamerName.toLowerCase()])
        }
    }, [])
    return (
        <div style={{display: "flex",margin: "auto",width: "fit-content",gap: "250px"}}>
            {

                donation.data.map((val, key) => {
                    return(
                        <>
                            <p> {val.description.toUpperCase()}</p>
                        </>
                    )
                })
            }
        </div>
    )
        ;
}

export default ListDonation;

