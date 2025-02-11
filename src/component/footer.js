import React,{useState, useEffect} from 'react';
import '../App.css'

function Footer(props) {
      return (
        <>
          <div className={"footerContainer"}>
            <p>©StreamOnForKids</p>
              <p>Site développé par <a style={{color:"#38617F",fontSize:"15px",textDecoration:"none"}} href={"https://twitch.tv/chromatyk"}>Chromatyk</a></p>
          </div>
        </>
      );
  }
export default Footer
