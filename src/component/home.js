import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";
import '../App.css'
import {Link} from "react-router-dom";
import UniqueStreamerClip from "./uniqueStreamerClip";

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
        })
    }, [])
  return (
    <>
        <div className="homeContainer">
            <div className={"firstPartHome"}>
                <div className={"homeContent"}>
                    <img style={{width: "300px"}} src={"images/logoSofk.png"}/>
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
            <div className={"secondPartHome"}>
                <div className={"homeContent"}>
                    <img style={{width: "500px"}} src={"images/logoSofk.png"}/>
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
            <a className="socialLink" target='_blank'
               href="https://streamlabscharity.com/teams/@stream-on-for-kids-2024/stream-on-for-kids-2024?member=643451324922470142&l=fr-FR">Faire
                un Don</a>
            <Link className={"linkToTwitch"} to="/Streams">Les lives</Link>
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
                <div className={"editionsContainer"}>
                    <p className={"nbEdition"}>Edition 2024</p>
                    <p className={"totalEdition"}>?</p>
                </div>
            </div>
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
    </>
  )
}

export default HomePage
