import React,{useState, useEffect} from 'react';
import '../App.css'

function Partners(props) {
    return (
        <>
            <div style={{position: "relative",backgroundColor: "#f7bb3e"}} className={"partnerSection"}>
                <h1 style={{color:"black",fontSize:"20px",padding:"10px"}} className={"titleEdition"}>Nos partenaires</h1>
                <div className={"partnerContainer"}>
                    <a href={"https://www.ville-fachesthumesnil.fr/"} target={"_blank"}><img src={"/images/faches.png"}/></a>
                    <div style={{display:"flex",flexFlow:"column",justifyContent:"center"}}>
                        <a href={"https://www.tokyosnackbox.com/"} target={"_blank"}><img src={"/images/tokyo.png"}/></a>
                        <small style={{textAlign:"center"}}>-10 % sur vos commandes avec le code <span style={{fontWeight:"bold"}}>STREAMON10</span><br/> pendant la durée de l'événement</small>
                    </div>
                    <a href={"https://mangadokaze.com/index.php"} target={"_blank"}><img src={"/images/manga.png"}/></a>
                    <div style={{display:"flex",flexFlow:"column",justifyContent:"center"}}>
                        <a href={"https://mistertee.fr/"} target={"_blank"}><img src={"/images/mister.png"}/></a>
                        <small style={{textAlign:"center"}}>-10 % sur vos commandes avec le code <span style={{fontWeight:"bold"}}>Stream10</span><br/> pendant la durée de
                            l'événement</small>
                    </div>
                    <a href={"https://www.burgerking.fr/#!"} target={"_blank"}><img src={"/images/burger.png"}/></a>
                    <a href={"https://www.dominos.fr/"} target={"_blank"}><img src={"/images/dominos.png"}/></a>
                </div>
            </div>
        </>
    );
}

export default Partners
