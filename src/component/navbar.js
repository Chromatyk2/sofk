import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Axios from 'axios'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BrowserRouter, Link} from "react-router-dom";
import env from "react-dotenv";
import Modal from "react-modal";
import StreamsModal from "./StreamsModal";

function NavBar(props) {
  const [count, setCount] = useState(0);
  const [stream, setStream] = useState(null);
  const [expanded, setExpanded] = useState(false);
  return (
      <>
          <Navbar expanded={expanded} bg="light" expand="lg">
              <Container fluid>
                  <Navbar.Toggle aria-controls="navbarScroll" onClick={() => setExpanded(!expanded)} />
                  <Navbar.Collapse id="navbarScroll">
                      <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                          <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/">Accueil</Link>
                          <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/Streams">Multi
                              Streams</Link>
                          <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/Clips">Clips</Link>
                      </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
          <div className={"buttonStreamsContainer"}>
              <button onClick={openModal} className={"buttonStreamers"}>Streameur.euses</button>
              <button className={"buttonStreamers"}>Boutique</button>
              <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                      <p style={{color: "white"}}>Streameur.euses</p>
                      <button style={{color: "white", border: "none", background: "none"}} onClick={closeModal}>X
                      </button>
                  </div>
                  <div className={"streamsModalContainer"}>
                      <StreamsModal refresh={refreshStreamers} change={closeModal} onStream={onStream}
                                    offStream={offStream} token={token}/>
                  </div>
              </Modal>
          </div>
      </>
)
    ;
}

export default NavBar;
