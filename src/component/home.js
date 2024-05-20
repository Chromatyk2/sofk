import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import '../App.css'
import {Link} from "react-router-dom";
import UniqueStreamerClip from "./uniqueStreamerClip";
import Login from '../services/auth.services.js';

function HomePage(props) {
    const [cookies, setCookie] = useCookies();
    const [user, setUser] = useState([]);
    const [team, setTeam] = useState([]);

    useEffect(() => {
        Axios.get(
            'https://api.twitch.tv/helix/teams?name=streamon',
            {
                headers: {
                    'Authorization': `Bearer ${cookies.token.access_token}`,
                    'Client-Id': process.env.REACT_APP_CLIENT_ID
                }
            }
        ).then(function (response) {
            if(response.status == 200){
                response.data.data[0].users.map((val, key) => {
                    Axios.get(
                        'https://api.twitch.tv/helix/users?login='+val.user_name,
                        {
                            headers:{
                                'Authorization': `Bearer ${cookies.token.access_token}`,
                                'Client-Id': process.env.REACT_APP_CLIENT_ID
                            }
                        }
                    ).then(function(response){
                        setUser(oldArrayOn => [...oldArrayOn, {infos: response.data.data}]);
                    })
                })
            }else{
                return <Login />
            }
        })
    }, [])
  return (
    <>
        <div className="homeContainer">
            <div className={"firstSectionHome"}>
                <div className={"homeContent"}>
                    <img style={{minWidth: "250px", width: "45%"}} src={"images/logoSofk.png"}/>
                    <div>
                        <p className={"paragraphHome"}>
                            Le <span>Stream On for Kids</span> est un évènement caritatif en ligne se déroulant chaque
                            année
                            à l’occasion
                            de la <span>Journée Internationale des Enfants Disparus</span> pour collecter des dons en
                            faveur
                            du <span>116 000 Enfants
                        Disparus</span>. Ce numéro d’urgence gratuit, disponible <span>24h/24 et 7j7</span>, accompagne
                            les familles
                            confrontées à la disparition de leur enfant.
                        </p>
                        <p className={"paragraphHome"}>
                            Créé à l’initiative de <span>Vaykhin</span> en 2021, le <span>Stream On for Kids</span> se
                            déroule sur Twitch, une
                            plateforme de vidéos en direct sur laquelle des streamers diffusent du contenu en
                            interagissant
                            avec leurs
                            spectateurs. L’événement a permis de collecter près de <span>30 000 €</span> en faveur du
                            numéro
                            d’urgence
                            lors de ses trois premières éditions et permet également d’accroitre la notoriété du
                            numéro <span>116 000</span>
                            auprès du public.
                        </p>
                    </div>
                </div>
            </div>
            <div className={"secondSectionHome"}>
                <div className={"homeContent"}>
                    <img style={{minWidth: "250px", width: "30%"}} src={"images/116000logo.webp"}/>
                    <div className={"linkContainerHome"}>
                        <p>
                            Le 116 000 est le numéro d’urgence gratuit accessible 24 h / 24 et 7 j / 7 en cas de
                            disparition d’enfant.
                            Nos équipes ont pour mission d’écouter et soutenir les familles d’enfants disparus.
                            Nous intervenons auprès des familles dans le cadre de fugues, d’enlèvements parentaux en
                            France ou à l’étranger, de disparitions inquiétantes de mineurs et de jeunes majeurs (de
                            moins de 25 ans).
                            Droit d’Enfance est membre de Missing Children Europe, fédération européenne pour les
                            enfants disparus et exploités sexuellement.
                        </p>
                        <div className={"infosAssoLink"}>
                            <a className="socialLink" target='_blank'
                               href="https://www.116000enfantsdisparus.fr/">116 000</a>
                            <a className="socialLink" target='_blank'
                               href="https://www.droitdenfance.org/">Droit d'enfance</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"thirdFakeContent"}></div>
            <div className={"thirdSectionHome"}>
                <div className={"homeContent"}>
                    <h1 className={"titleEdition"}>Editions précédentes</h1>
                    <div className={"editionsInfosContainer"}>
                        <div className={"editionsContainer"}>
                            <p className={"nbEdition"}>Edition 2021</p>
                            <p className={"totalEdition"}>2 800 €</p>
                        </div>
                        <div className={"editionsContainer"}>
                            <p className={"nbEdition"}>Edition 2022</p>
                            <p className={"totalEdition"}>8 238 €</p>
                        </div>
                        <div className={"editionsContainer"}>
                            <p className={"nbEdition"}>Edition 2023</p>
                            <p className={"totalEdition"}>17 414 €</p>
                        </div>
                        <div style={{width: "85%"}} className={"editionsContainer"}>
                            <p className={"nbEdition"}>Edition 2024</p>
                            <p className={"totalEdition"}>?</p>
                            <Link className={"liveButtonHome"} to="/Streams">Les lives !</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"fourthSectionHome"}>
                    <h1 className={"titleEdition"}>Streamer.euses 2024</h1>
                    <div className={"streamListHome"}>
                        {user.length > 0 &&
                            user.map((val, key) => {
                                return (
                                    <div className={"streamHomeContainer"}>
                                        <a href={"https://twitch.tv/" + val.infos[0].login} target={"_blank"}>
                                            <img src={val.infos[0].profile_image_url}/>
                                        </a>
                                        <p style={{textAlign: "center"}}>{val.infos[0].login}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
            </div>
        </div>
    </>
  )
}

export default HomePage
