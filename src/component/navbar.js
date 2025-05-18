import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Axios from 'axios'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BrowserRouter, Link} from "react-router-dom";
import env from "react-dotenv";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InstaSVG from '../instagram-brands.svg'

function NavBar(props) {
    const [count, setCount] = useState(0);
    const [stream, setStream] = useState(null);
    const [expanded, setExpanded] = useState(false);
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
                        <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/Streams">Multi Streams</Link>
                        <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/Clips">Clips</Link>
                        <Link target={"_blank"} to={"https://www.instagram.com/streamonforkids/"}><InstaSVG  /></Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;