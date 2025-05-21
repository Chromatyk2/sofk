import React, {useEffect} from 'react';
import '../App.css'

function Asso() {
    return (
        <>
            <div className="homeContainer">
                <div className={"homeContent"}>
                    <img style={{width: "250px", marginBottom: "25px"}} src={"images/116000logo.webp"}/>
                    <div style={{
                        maxWidth: "650px",
                        display: "block",
                        margin: "auto",
                        marginTop: "60px",
                        marginBottom: "60px"
                    }}>
                        <h3 style={{color: "rgb(252, 194, 73)"}} className={"TitleAsso"}>
                            Qu'est de que le 116 000 ?
                        </h3>
                        <p className={"paragraphHome"}>
                            Le <span style={{color: "rgb(252, 194, 73)"}}>116 000</span> est un numéro d’urgence
                            gratuit, disponible <span style={{color: "rgb(252, 194, 73)"}}>24h/24 et 7j/7</span> à
                            appeler en cas de disparition de mineurs. Il a été créé pour écouter et soutenir les
                            familles d’enfants disparus en leur apportant un soutien psychologique, juridique et social.
                            C’est un numéro européen présent dans <span
                            style={{color: "rgb(252, 194, 73)"}}>32 pays</span>s.
                        </p>
                        <h3 style={{color: "rgb(252, 194, 73)"}} className={"TitleAsso"}>
                            Qui peut appeler le 116 000 ?
                        </h3>
                        <p className={"paragraphHome"}>
                            Ce numéro est accessible à tout le monde et il est <span style={{color: "rgb(252, 194, 73)"}}>gratuit</span>. Ce sont généralement les
                            parents, les familles, les proches des enfants disparus qui appellent, afin d’être guidés,
                            écoutés, suivis et accompagnés le mieux possible..
                        </p>
                        <h3 style={{color: "rgb(252, 194, 73)"}} className={"TitleAsso"}>
                            Le numéro 116 000 est-il dédié seulement aux disparitions en France ?
                        </h3>
                        <p className={"paragraphHome"}>
                            Le numéro <span style={{color: "rgb(252, 194, 73)"}}>116 000</span> est utile pour toutes les disparitions de mineurs, que l’enfant soit en
                            France ou non, qu’il ait disparu en France ou à l’étranger. Le <span style={{color: "rgb(252, 194, 73)"}}>116 000</span> français collabore
                            ensuite avec les autres associations européennes ayant en charge le <span style={{color: "rgb(252, 194, 73)"}}>116 000</span> dans leur pays.
                        </p>
                        <h3 style={{color: "rgb(252, 194, 73)"}} className={"TitleAsso"}>
                            Peut-on appeler anonymement ?
                        </h3>
                        <p className={"paragraphHome"}>
                            Il est possible de ne pas donner son identité, par contre, comme pour tout numéro d’urgence,
                            il est impossible d’appeler avec un numéro masqué ; donc le numéro de la personne qui
                            appelle s’affichera forcément.
                        </p>
                        <a target={"_blank"} className={"makeDonation"}
                           href={"https://www.116000enfantsdisparus.fr/"}>+ d'infos</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Asso