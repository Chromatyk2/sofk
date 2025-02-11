import React,{useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import Axios from 'axios'
import env from "react-dotenv";

function AuthService(props) {

  const [cookies, setCookie, removeCookie] = useCookies();
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = "https://preview--streamonforkids.netlify.app/";
  // const REDIRECT_URI = "https://chromatyk.fr/";
  const SCOPES = ['openid'];
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

  const isAuthenticated = () => {
        Axios.post(
        'https://id.twitch.tv/oauth2/token',
        {
          client_id:CLIENT_ID,
          client_secret:CLIENT_SECRET,
          grant_type:"client_credentials",
          redirect_uri:"https://preview--streamonforkids.netlify.app/"
        }
      )
      .then(
        (result) => {
            setCookie('token', result.data,{days:1} );
            props.change();
          }
        );
  }

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
      <div className="homeContainer">
          <img style={{width:"70%",top:"50%",bottom:"50%",left:"0",right:"0"}} src={"/images/animatedSOFK.gif"}/>
      </div>
  )
}

export default AuthService;
