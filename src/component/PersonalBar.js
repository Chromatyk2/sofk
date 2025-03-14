// import React,{useState, useEffect} from 'react';
// import Axios from 'axios'
// import {useCookies} from "react-cookie";
// import {BrowserRouter, Link} from "react-router-dom";
// import {ca} from "date-fns/locale";
// import donationGoal from '../donationGoal.json'
//
// function PersonalBar(props) {
//     const [cagnotte, setCagnotte] = useState([]);
//     const [donation, setDonation] = useState([]);
//     const customStyles = {
//         extBar: {
//             width: "100%",
//             backgroundColor: "rgb(50, 82, 105)",
//             position: "relative",
//             zIndex: 1,
//             borderRadius: "50px",
//             margin: 0,
//             height: "30px"
//         }
//     }
//     useEffect(() => {
//         const queryParameters = new URLSearchParams(window.location.search)
//         var streamerName = queryParameters.get("streamer");
//         props.donations.filter(donation => donation.member != null).filter(donation => donation.member.user.display_name == streamerName).map((val, key) => {
//             setCagnotte(oldCagnotte => [...oldCagnotte, val.donation.original_amount]);
//         });
//         if (donationGoal[streamerName.toLowerCase()] != undefined) {
//             setDonation(donationGoal[streamerName.toLowerCase()])
//         }
//     }, [])
//     return (
//         <>
//             <p style={{
//                 fontSize: "13px",
//                 textAlign: "right",
//                 margin: 0
//             }}>
//                 {donation.length > 0 ? donation.filter(item => item.montant >= cagnotte.reduce((a, v) => a = a + v, 0) / 100).length > 0 ? donation.filter(item => item.montant >= cagnotte.reduce((a, v) => a = a + v, 0) / 100)[0].montant : "Plus de donations goal ! Merci !" : "Plus de donations goal ! Merci !"}
//             </p>
//             <div style={customStyles.extBar} className="fullProgressBar">
//                 <div
//                     style={{
//                         width: donation.length > 0 ? donation.filter(item => item.montant >= cagnotte.reduce((a, v) => a = a + v, 0) / 100).length > 0 ? parseFloat(cagnotte.reduce((a, v) => a = a + v, 0) / donation.filter(item => item.montant >= cagnotte.reduce((a, v) => a = a + v, 0) / 100)[0].montant).toFixed(2) + "%" : "100%" : "100%",
//                         position: 'relative',
//                         textWrap: 'nowrap',
//                         color: '#38617f',
//                         padding: '15px',
//                         borderRadius: '50px 50px 50px 50px',
//                         height: "30px",
//                         lineHeight: 0,
//                         backgroundImage: "linear-gradient(180deg,#9ad4de 24%,#fff 155%)"
//                     }}>
//                     {cagnotte.reduce((a, v) => a = a + v, 0) / 100} €
//                 </div>
//             </div>
//         </>
//     );
// }
//
// export default PersonalBar;

import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import {BrowserRouter, Link} from "react-router-dom";
import {ca} from "date-fns/locale";
import donationGoal from '../donationGoal.json'

function PersonalBar(props) {
    const [cagnotte, setCagnotte] = useState([]);
    const [donation, setDonation] = useState([]);
    const [donations, setDonations] = useState([]);
    const [load, setLoad] = useState(true);
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
            width: "75%",
            backgroundColor: "rgb(50, 82, 105)",
            position: "relative",
            zIndex: 1,
            borderRadius: "10px",
            height: "40px",
            margin:"0",
        }
    }
    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        Axios.get('https://streamlabscharity.com/api/v1/teams/643437249115068091/donations?page=1')
            .then(function (response) {
                response.data.map((val, key) => {
                        setDonations(oldDonations => [...oldDonations, val]);
                })
                if (response.data.length == 500) {
                    Axios.get('https://streamlabscharity.com/api/v1/teams/643437249115068091/donations?page=2')
                        .then(function (response) {
                            response.data.map((val, key) => {
                                    setDonations(oldDonations => [...oldDonations, val]);
                            })
                            if (response.data.length == 500) {
                                Axios.get('https://streamlabscharity.com/api/v1/teams/643437249115068091/donations?page=3')
                                    .then(function (response) {
                                        response.data.map((val, key) => {
                                                setDonations(oldDonations => [...oldDonations, val]);
                                        })
                                    })
                            }else{
                                setLoad(false)
                            }
                        })
                }else{
                    setLoad(false)
                }
            })
    }, []);
    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        var streamerName = queryParameters.get("streamer");
        if (donationGoal[streamerName.toLowerCase()] != undefined) {
            setDonation(donationGoal[streamerName.toLowerCase()])
        }
    }, [])
    useEffect(() => {
        if(load === false){
            const interval = setInterval(() =>
                {
                    setCagnotte([])
                    const queryParameters = new URLSearchParams(window.location.search)
                    var streamerName = queryParameters.get("streamer");
                    donations.filter(donation => donation.member != null).filter(donation => donation.member.user.display_name == streamerName).map((val, key) => {
                        setCagnotte(oldCagnotte => [...oldCagnotte, val.donation.original_amount]);
                    });
                    if (donationGoal[streamerName.toLowerCase()] != undefined) {
                        setDonation(donationGoal[streamerName.toLowerCase()])
                    }
                },30000
            );
            return () => {
                clearInterval(interval);
            };
        }
    }, [load])
    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        var streamerName = queryParameters.get("streamer");
        if(streamerName == "Vaykhin"){
            setMontant((montant) + 2)
        }else if (streamerName == "hebi_scarlet"){
            setMontant((montant) + 1)
        }else{
            setMontant(montant)
        }
    }, [cagnotte])

    console.log(cagnotte)
    return (
        <>
            {/*<div className={"personalBarContainer"}>*/}
            {/*    <img style={{width: "200px", position: "relative", top: "-87px", marginBottom: "-80px"}}*/}
            {/*         src={"images/logoSofk.png"}/>*/}
            {/*    {donation.filter(item => item.montant >= cagnotte).length > 0 ?*/}
            {/*        <>*/}
            {/*            <p style={{color: "white", fontSize: "25px", textAlign: "center"}}>Prochain donation Goal</p>*/}
            {/*            <p style={{fontSize: "50px", textAlign: "center", color: "#fcc249"}}>*/}
            {/*                {donation.filter(item => item.montant >= cagnotte)[0].montant + " €"}*/}
            {/*            </p>*/}
            {/*            <p style={{fontSize: "20px", textAlign: "center", color: "white"}}>*/}
            {/*                {donation.filter(item => item.montant >= cagnotte).length > 0 && donation.filter(item => item.montant >= cagnotte)[0].description}*/}
            {/*            </p>*/}
            {/*        </>*/}
            {/*        :*/}
            {/*        <p style={{fontSize: "25px", textAlign: "center", color: "#fcc249"}}>*/}
            {/*            Plus de donations goal ! Merci !*/}
            {/*        </p>*/}
            {/*    }*/}
            {/*    <div style={customStyles.extBar} className="fullProgressBar">*/}
            {/*        <div*/}
            {/*            className={"intBar"}*/}
            {/*            style={{*/}
            {/*                width: donation.filter(item => item.montant >= cagnotte).length > 0 ? parseFloat((cagnotte / donation.filter(item => item.montant >= cagnotte)[0].montant) * 100).toFixed(2) + "%" : "100%",*/}
            {/*                position: 'relative',*/}
            {/*                textWrap: 'nowrap',*/}
            {/*                color: 'white',*/}
            {/*                padding: '15px',*/}
            {/*                borderRadius: '50px 50px 50px 50px',*/}
            {/*                height: "30px",*/}
            {/*                lineHeight: 0,*/}
            {/*                backgroundImage: "linear-gradient(180deg, #b27d0d 24%, #fcc249 155%)", textAlign: "center"*/}
            {/*            }}>*/}
            {/*            {cagnotte} €*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={"personalBarContainerInline"}>
                {donation.filter(item => item.montant >= montant).length > 0 ?
                    <div style={{width: "100%"}}>
                        <div>
                            <p style={{fontSize: "30px", textAlign: "left", color: "white", margin:0}}>
                                {donation.filter(item => item.montant >= montant).length > 0 && donation.filter(item => item.montant >= montant)[0].description}
                            </p>
                            <div style={customStyles.extBarInline} className="fullProgressBar">
                                <div
                                    className={"intBar"}
                                    style={{
                                        width: donation.filter(item => item.montant >= montant).length > 0 ? parseFloat((montant / donation.filter(item => item.montant >= montant)[0].montant) * 100).toFixed(2) + "%" : "100%",
                                        position: 'relative',
                                        textWrap: 'nowrap',
                                        color: 'white',
                                        padding: '15px',
                                        borderRadius: '10px 10px 10px 10px',
                                        height: "40px",
                                        lineHeight: 0,
                                        backgroundColor: "rgb(252, 194, 73)",
                                        textAlign: "left",
                                        margin: 0
                                    }}>
                                    <p style={{
                                        fontSize: "25px",
                                        textAlign: "left",
                                        color: "white",
                                        lineHeight: "12px"
                                    }}>
                                        {montant} €
                                    </p>
                                </div>
                                <p style={{
                                    fontSize: "25px",
                                    textAlign: "right",
                                    color: "white",
                                    position: "absolute",
                                    right: "12px",
                                    zIndex: 1,
                                    top: "3px"
                                }}>
                                    {donation.filter(item => item.montant >= montant)[0].montant + " €"}
                                </p>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <p style={{fontSize: "25px", textAlign: "left", color: "white"}}>
                            Plus de donations goal ! Merci !
                        </p>
                        <div style={customStyles.extBarInline} className="fullProgressBar">
                            <div
                                className={"intBar"}
                                style={{
                                    width: donation.filter(item => item.montant >= montant).length > 0 ? parseFloat((montant / donation.filter(item => item.montant >= montant)[0].montant) * 100).toFixed(2) + "%" : "100%",
                                    position: 'relative',
                                    textWrap: 'nowrap',
                                    color: 'white',
                                    padding: '15px',
                                    borderRadius: '50px 50px 50px 50px',
                                    height: "30px",
                                    lineHeight: 0,
                                    backgroundColor: "rgb(252, 194, 73)",
                                    textAlign: "center"
                                }}>
                                {montant} €
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
        ;
}

export default PersonalBar;

