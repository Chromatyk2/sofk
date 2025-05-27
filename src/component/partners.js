import React,{useState, useEffect} from 'react';
import '../App.css'

function Partners(props) {
    return (
        <>
            <div style={{position: "relative",backgroundColor: "#f7bb3e", marginTop:"25px"}} className={"partnerSection"}>
                <h1 style={{color:"black",fontSize:"20px",padding:"10px"}} className={"titleEdition"}>Nos partenaires</h1>
                <div className={"partnerContainer"}>
                    <a href={"https://www.ville-fachesthumesnil.fr/"} target={"_blank"}><img
                        src={"/images/faches.png"}/></a>
                    <div style={{height: "120px", display: "flex", flexFlow: "column", justifyContent: "center"}}>
                        <a href={"https://mistertee.fr/"} target={"_blank"}><img src={"/images/mister.png"}/></a>
                        {/*<small style={{textAlign: "center"}}>-10 % sur vos commandes avec le code <span*/}
                        {/*    style={{fontWeight: "bold"}}>Stream10</span><br/> pendant la durée de*/}
                        {/*    l'événement</small>*/}
                    </div>
                    <a href={"https://www.kiloutou.fr/"} target={"_blank"}><img src={"/images/kiloutou.png"}/></a>
                    <a href={"https://www.instagram.com/lamoussetouch/"} target={"_blank"}><img
                        src={"/images/mousse.png"}/></a>
                    <a href={"https://barbraz.com/"} target={"_blank"}><img src={"/images/braz.png"}/></a>
                    <a href={"https://www.bricodepot.fr/"} target={"_blank"}><img src={"/images/brico.jpg"}/></a>
                    <a href={"https://agtraiteur.fr/"} target={"_blank"}><img src={"/images/ag.png"}/></a>
                    <a href={"https://www.dominos.fr/"} target={"_blank"}><img src={"/images/dominos.png"}/></a>
                    <a href={"https://techme-event.fr/"} target={"_blank"}><img src={"/images/techme.png"}/></a>
                    <a href={"https://www.instagram.com/chti.bao/?hl=fr"} target={"_blank"}><img src={"/images/bao.jpg"}/></a>
                    <a href={"https://www.facebook.com/FriterieChezPierro/"} target={"_blank"}><img src={"/images/pierro.png"}/></a>
                </div>
            </div>
        </>
    );
}

export default Partners
