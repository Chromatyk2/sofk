import React,{useState, useEffect} from 'react';
import '../App.css'

function Partners(props) {
    return (
        <>
            <div style={{position: "relative",backgroundColor: "#f7bb3e"}} className={"partnerSection"}>
                <h1 style={{color:"black"}} className={"titleEdition"}>Nos partenaires</h1>
                <div className={"partnerContainer"}>
                    <a href={"https://www.ville-fachesthumesnil.fr/"}><img src={"/images/faches.png"}/></a>
                    <a href={"https://www.tokyosnackbox.com/"}><img src={"/images/tokyo.png"}/></a>
                    <a href={"https://mangadokaze.com/index.php"}><img src={"/images/manga.png"}/></a>
                    <a href={"https://mistertee.fr/"}><img src={"/images/mister.png"}/></a>
                    <a href={"https://www.burgerking.fr/#!"}><img src={"/images/burger.png"}/></a>
                    <a href={"https://www.dominos.fr/"}><img src={"/images/dominos.png"}/></a>
                </div>
            </div>
        </>
    );
}

export default Partners
