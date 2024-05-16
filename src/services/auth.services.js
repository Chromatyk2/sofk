import React,{useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import Axios from 'axios'
import env from "react-dotenv";

function AuthService() {

  const [cookies, setCookie, removeCookie] = useCookies();
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = "https://streamonforkids.fr/";
  // const REDIRECT_URI = "https://chromatyk.fr/";
  const SCOPES = ['openid'];
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

  const isAuthenticated = () => {
      const params = {
          client_id: CLIENT_ID,
          redirect_uri: REDIRECT_URI,
          grant_type: "client_credentials"
      };
        Axios.post(
        'https://id.twitch.tv/oauth2/token',
        {
          client_id:CLIENT_ID,
          client_secret:CLIENT_SECRET,
          code:params.code,
          grant_type:"authorization_code",
          redirect_uri:"https://streamonforkids.fr/"
        }
      )
      .then(
        (result) => {
            setCookie('token', result.data,{days:1} );
          }
        );
      return params["access_token"] !== undefined;
  }

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
      <div className="homeContainer">
          <div className={"homeContent"}>
              <img style={{width: "300px"}} src={"images/logoSofk.png"}/>
              <div>
                  <p className={"paragraphHome"}>
                      Le <span>Stream On for Kids</span> est un évènement caritatif en ligne se déroulant chaque année
                      à l’occasion
                      de la <span>Journée Internationale des Enfants Disparus</span> pour collecter des dons en faveur
                      du <span>116 000 Enfants
                        Disparus</span>. Ce numéro d’urgence gratuit, disponible <span>24h/24 et 7j7</span>, accompagne
                      les familles
                      confrontées à la disparition de leur enfant.
                  </p>
                  <p className={"paragraphHome"}>
                      Créé à l’initiative de <span>Vaykhin</span> en 2021, le <span>Stream On for Kids</span> se
                      déroule sur Twitch, une
                      plateforme de vidéos en direct sur laquelle des streamers diffusent du contenu en interagissant
                      avec leurs
                      spectateurs. L’événement a permis de collecter près de <span>30 000 €</span> en faveur du numéro
                      d’urgence
                      lors de ses trois premières éditions et permet également d’accroitre la notoriété du
                      numéro <span>116 000</span>
                      auprès du public.
                  </p>
              </div>
          </div>
          <a className="socialLink" target='_blank'
             href="https://streamlabscharity.com/teams/@stream-on-for-kids-2024/stream-on-for-kids-2024?member=643451324922470142&l=fr-FR">Faire
              un Don</a>

          <button className="loginButton" onClick={isAuthenticated}>Visiter le site
          </button>
      </div>
  )
}

export default AuthService;
