import React,{useState, useEffect} from 'react';
import {useCookies} from "react-cookie";
import UniqueStreamer from './uniqueStreamer.js';
import UniqueStreamerMozaique from './UniqueStreamerMozaique.js';
import Login from "../services/auth.services";
import UniqueStreamerModal from "./UniqueStreamerModal";
import '../Component.css';
import Axios from "axios";

function StreamsModal(props) {
    const [donations, setDonations] = useState([]);
    useEffect(() => {
        if(props.onStream.length == 0 && props.offStream.length == 0){
            props.refresh();
        }
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
                                        }
                                    })
                            }
                        })
                }
            })
    }, []);
    function handleDataFromChild(data) {
        props.change();
    }
    return (
        <>
            {
                Array.from(new Set(props.onStream)).sort((a, b) => (a.infos[0].viewer_count < b.infos[0].viewer_count) ? 1 : -1).map((val, key) => {
                    return (
                        <UniqueStreamerModal donations={donations} charityStreamers={props.charityStreamers} change={handleDataFromChild} onStream={true} streamer={val} token={props.token}/>
                    )
                })
            }
            {
                props.offStream.map((val, key) => {
                    return (
                        <UniqueStreamerModal donations={donations} charityStreamers={props.charityStreamers} change={handleDataFromChild} onStream={false} streamer={val} token={props.token}/>
                    )
                })
            }
        </>
    )
        ;
}

export default StreamsModal;