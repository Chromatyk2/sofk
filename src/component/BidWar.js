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
    const [cagnotteOne, setCagnotteOne] = useState([]);
    const [cagnotteTwo, setCagnotteTwo] = useState([]);
    const [cagnotteThree, setCagnotteThree] = useState([]);
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
    const [bidValueThree, setBidValueThree] = useState(null);
    const [readyMontant, setReadyMontant] = useState(0);
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
            textAlign: "center",
            lineHeight: "38px",
            fontSize:" 25px"
        }
    }
    function runBid(e) {
        setBidName(document.getElementById("bidName").value);
        setBidValueOne(document.getElementById("bidValueOne").value);
        setBidValueTwo(document.getElementById("bidValueTwo").value);
        setBidValueThree(document.getElementById("bidValueThree").value);
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
    }

    useEffect(() => {
        if(donations.length > 0){
            setDonations([]);
            setCagnotteOne([])
            setCagnotteTwo([])
            setCagnotteThree([])
            const queryParameters = new URLSearchParams(window.location.search)
            var streamerName = queryParameters.get("streamer");
            donations.filter(donation => donation.member != null).filter(donation => donation.comment != null).filter(donation => donation.member.user.display_name.toLowerCase() == streamerName.toLowerCase()).filter((uc) => uc.donation.comment.text.toLowerCase().includes(bidValueOne.toLowerCase())).map((val, key) => {
                setCagnotteOne(oldCagnotte => [...oldCagnotte, val.donation.original_amount]);
            });
            donations.filter(donation => donation.member != null).filter(donation => donation.comment != null).filter(donation => donation.member.user.display_name.toLowerCase() == streamerName.toLowerCase()).filter((uc) => uc.donation.comment.text.toLowerCase().includes(bidValueTwo.toLowerCase())).map((val, key) => {
                setCagnotteTwo(oldCagnotte => [...oldCagnotte, val.donation.original_amount]);
            });
            donations.filter(donation => donation.member != null).filter(donation => donation.comment != null).filter(donation => donation.member.user.display_name.toLowerCase() == streamerName.toLowerCase()).filter((uc) => uc.donation.comment.text.toLowerCase().includes(bidValueThree.toLowerCase())).map((val, key) => {
                setCagnotteThree(oldCagnotte => [...oldCagnotte, val.donation.original_amount]);
            });
            setReadyMontant(Math.random())
        }
    }, [load])

    useEffect(() => {
        setValueOne(cagnotteOne.reduce((a, b) => a + b, 0) / 100)
        setValueTwo(cagnotteTwo.reduce((a, b) => a + b, 0) / 100)
        setValueThree(cagnotteThree.reduce((a, b) => a + b, 0) / 100)
    }, [readyMontant])
    return (
        <>
            <div className={"personalBarContainerInline"}>
                {bidName ?
                    <div style={{width: "100%", justifyContent:"center", display:"flex"}}>
                        <div>
                            <p className={"bidWarName"}>{bidName}</p>
                            <div className={"bidWarValues"}>
                                <p>{bidValueOne}</p>
                                <p>{bidValueTwo}</p>
                                <p>{bidValueThree}</p>
                            </div>
                            <div style={customStyles.extBarInline} id="bar">
                                    <span className="seg1" style={{
                                        width: parseFloat((valueOne / (parseInt(valueOne) + parseInt(valueTwo) + parseInt(valueThree))) * 100) + "%",
                                        backgroundColor: "#38617f",
                                        color: 'white',
                                        borderRadius: '10px 0 0 10px',
                                    }}>{valueOne > 0 && valueOne+' €'}</span>
                                    <span className="seg2" style={{
                                        width:  parseFloat((valueTwo / (parseInt(valueOne) + parseInt(valueTwo) + parseInt(valueThree))) * 100) + "%",
                                        backgroundColor: "#fcc249",
                                        color: 'white',
                                    }}>{valueTwo > 0 &&  valueTwo+' €'}</span>
                                    <span className="seg3"  style={{
                                        width: parseFloat((valueThree / (parseInt(valueOne) + parseInt(valueTwo) + parseInt(valueThree))) * 100) + "%" ,
                                        backgroundColor: "#5b8aa1",
                                        color: 'white',
                                        borderRadius: '0 10px 10px 0',
                                    }}>{valueThree > 0 && valueThree+' €'}</span>
                            </div>
                        </div>
                    </div>
                    :
                    <div style={{display: "flex",flexFlow: "column",gap: "5px"}}>
                        <input style={{width:"100%"}} placeholder={"Intitulé de la bidwar"} type={"text"} id={"bidName"}/>
                        <div>
                            <div className={"inputBid"}>
                                <div style={{height:"20px",width:"20px",backgroundColor:"#38617f", borderRadius:"100px"}}></div>
                                <input placeholder={"Première valeure"} type={"text"} id={"bidValueOne"}/>
                            </div>
                            <div className={"inputBid"}>
                                <div style={{
                                    height: "20px",
                                    width: "20px",
                                    backgroundColor: "#fcc249",
                                    borderRadius: "100px"
                                }}></div>
                                <input placeholder={"Deuxième Valeure"} type={"text"} id={"bidValueTwo"}/>
                            </div>
                            <div className={"inputBid"}>
                                <div style={{
                                    height: "20px",
                                    width: "20px",
                                    backgroundColor: "#5b8aa1",
                                    borderRadius: "100px"
                                }}></div>
                                <input placeholder={"Troisième Valeure"} type={"text"} id={"bidValueThree"}/>
                            </div>
                        </div>
                        <button onClick={runBid}>GO !</button>
                    </div>
                }
            </div>
        </>
    )
        ;
}

export default BidWar;

