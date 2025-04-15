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
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

function BidWar(props) {
    const [cagnotte, setCagnotte] = useState([]);
    const [donation, setDonation] = useState([]);
    const [donations, setDonations] = useState([]);
    const [load, setLoad] = useState(0);
    const [montant, setMontant] = useState(true);
    const [valueOne, setValueOne] = useState(0);
    const [valueTwo, setValueTwo] = useState(0);
    const [valueThree, setValueThree] = useState(0);
    const [bidName, setBidName] = useState(null);
    const [bidValueOne, setBidValueOne] = useState(null);
    const [bidValueTwo, setBidValueTwo] = useState(null);
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
            ,5000
        );
        return () => {
            clearInterval(interval);
        };
    }, []);
    // useEffect(() => {
    //     const queryParameters = new URLSearchParams(window.location.search);
    //     var streamerName = queryParameters.get("streamer");
    //     if (donationGoal[streamerName.toLowerCase()] != undefined) {
    //         setDonation(donationGoal[streamerName.toLowerCase()])
    //     }
    // }, [])
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
    function changeNumberOne(e) {
        setValueOne(e.target.value);
    }
    function changeNumberTwo(e) {
        setValueTwo(e.target.value);
    }nction changeNumberThree(e) {
        setValueThree(e.target.value);
    }
    function runBid(e) {
        setBidName(document.getElementById("bidName").value);
        setBidValueOne(document.getElementById("bidValueOne").value);
        setBidValueTwo(document.getElementById("bidValueTwo").value);
        setBidValueThree(document.getElementById("bidValueThree").value);
    }
    return (
        <>
            <input type={"number"} onChange={changeNumberOne}/>
            <input type={"number"} onChange={changeNumberTwo}/>
            <input type={"number"} onChange={changeNumberThree}/>
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
                {bidName ?
                    <div style={{width: "100%"}}>
                        <div>
                            <p className={"bidWarName"}>{bidName}</p>
                            <div className={"bidWarValues"}>
                                <p>{bidValueOne}</p>
                                <p>{bidValueTwo}</p>
                            </div>
                            <div id="bar">
                                <span className="seg1" style={{
                                    width: parseFloat((valueOne / (parseInt(valueOne) + parseInt(valueTwo) + parseInt(valueThree))) * 100) + "%",
                                    backgroundColor: "#38617f"
                                }}>F</span>
                                <span className="seg2" style={{
                                    width: parseFloat((valueTwo / (parseInt(valueOne) + parseInt(valueTwo) + parseInt(valueThree))) * 100) + "%",
                                    backgroundColor: "#fcc249"
                                }}>D</span>
                                <span className="seg3"  style={{
                                    width: parseFloat((valueThree / (parseInt(valueOne) + parseInt(valueTwo) + parseInt(valueThree))) * 100) + "%",
                                    backgroundColor: "#3a829b"
                                }}>D</span>
                            </div>
                            {/*<div style={customStyles.extBarInline} className="fullProgressBar">*/}
                            {/*    <div*/}
                            {/*        className={"intBar"}*/}
                            {/*        style={{*/}
                            {/*            width: parseFloat((valueOne / (parseInt(valueOne) + parseInt(valueTwo))) * 100) + "%",*/}
                            {/*            position: 'relative',*/}
                            {/*            textWrap: 'nowrap',*/}
                            {/*            color: 'white',*/}
                            {/*            padding: '15px',*/}
                            {/*            borderRadius: '10px 10px 10px 10px',*/}
                            {/*            height: "37px",*/}
                            {/*            lineHeight: 0,*/}
                            {/*            backgroundColor: "rgb(252, 194, 73)",*/}
                            {/*            textAlign: "left",*/}
                            {/*            margin: 0*/}
                            {/*        }}>*/}
                            {/*    </div>*/}
                            {/*    <p style={{*/}
                            {/*        fontSize: "28px",*/}
                            {/*        textAlign: "right",*/}
                            {/*        color: "white",*/}
                            {/*        position: "absolute",*/}
                            {/*        left: "12px",*/}
                            {/*        zIndex: 1,*/}
                            {/*        top: "0px"*/}
                            {/*    }}>*/}
                            {/*        {valueOne} €*/}
                            {/*    </p>*/}
                            {/*    <p style={{*/}
                            {/*        fontSize: "28px",*/}
                            {/*        textAlign: "right",*/}
                            {/*        color: "white",*/}
                            {/*        position: "absolute",*/}
                            {/*        right: "12px",*/}
                            {/*        zIndex: 1,*/}
                            {/*        top: "0px"*/}
                            {/*    }}>*/}
                            {/*        {valueTwo + " €"}*/}
                            {/*    </p>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    :
                    <div>
                        <input placeholder={"Intitulé de la bidwar"} type={"text"} id={"bidName"}
                               onChange={changeNumberOne}/>
                        <input placeholder={"Première valeure"} type={"text"} id={"bidValueOne"}
                               onChange={changeNumberTwo}/>
                        <input placeholder={"Deuxième Valeure"} type={"text"} id={"bidValueTwo"}
                               onChange={changeNumberTwo}/>
                        <button onClick={runBid}>GO !</button>
                    </div>
                }
            </div>
        </>
    )
        ;
}

export default BidWar;

