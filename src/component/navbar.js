import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Axios from 'axios'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BrowserRouter, Link} from "react-router-dom";
import env from "react-dotenv";
import Login from "../services/auth.services";
import { useCookies } from 'react-cookie';

function NavBar(props) {
  const [count, setCount] = useState(0);
  const [stream, setStream] = useState(null);
  const [expanded, setExpanded] = useState(false);
    const [cookies, setCookie] = useCookies();
    const [streamToDisplay, setStreamToDisplay] = useState();
    const [team, setTeam] = useState([]);
    const [onStream, setOnStream] = useState([]);
    const [orderedOnStream, setOrderedOnStream] = useState([]);
    const [offStream, setOffStream] = useState([]);
    const [charityTeam, setCharityTeam] = useState([]);

  useEffect(() => {
        Axios.get(
            'https://streamlabscharity.com/api/v1/teams/643437249115068091'
        ).then(function (response) {
            response.data.members.map((val, key) => {
                setCookie('charityTeam', oldArrayOn => [...oldArrayOn, {infos: val.user}],{days:1} );
            })
        })
    }, []);
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

            if(response.status == 200) {
                setTeam(response.data.data[0].users);
                response.data.data[0].users.map((val, key) => {
                    Axios.get(
                        'https://api.twitch.tv/helix/streams?user_login=' + val.user_name,
                        {
                            headers: {
                                'Authorization': `Bearer ${cookies.token.access_token}`,
                                'Client-Id': process.env.REACT_APP_CLIENT_ID
                            }
                        }
                    ).then(function (response) {
                        if (response.data.data.length > 0) {
                            setCookie('onStream', oldArrayOn => [...oldArrayOn, {infos: response.data.data}],{days:1} );
                        } else if (response.data.data.length < 1) {
                            setCookie('offStream', oldArrayOff => [...oldArrayOff, val.user_name],{days:1} );
                        }
                    })
                })
            }else{
                return <Login />
            }
        })
    }, [])
    useEffect(() => {
        setCookie('orderedOnStream', onStream.sort((a, b) => (a.infos[0].viewer_count < b.infos[0].viewer_count) ? 1 : -1),{days:1} );
    }, [onStream.length + offStream.length == team.length]);

  return (

      <Navbar expanded={expanded} bg="light" expand="lg">
          <Container fluid>
              <Navbar.Toggle
                  aria-controls="navbarScroll"
                  onClick={() => setExpanded(!expanded)}
              />
              <Navbar.Collapse id="navbarScroll">
                  <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                     <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/">Accueil</Link>
                      <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/Clips">Clips</Link>
                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
  );
}

export default NavBar;
