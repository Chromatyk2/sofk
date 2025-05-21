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
                        <h1 className={"TitleAsso"}>
                            Qu'est de que le 116 000 ?
                        </h1>
                        <p className={"paragraphHome"}>
                            Le 116 000 est un numéro d’urgence gratuit, disponible 24h/24 et 7j/7 à appeler en cas de disparition de mineurs. Il a été créé pour écouter et soutenir les familles d’enfants disparus en leur apportant un soutien psychologique, juridique et social. C’est un numéro européen présent dans 32 pays.
                        </p>
                    </div>
                    <div style={{marginTop: "30px", marginBottom: "150px"}}>
                        <h1 className={"titleEdition"}>Editions précédentes</h1>
                        <div className={"editionsInfosContainer"}>
                            <div className={"editionsContainer"}>
                                <p className={"nbEdition"}>Edition 2024</p>
                                <p className={"totalEdition"}>23 542 €</p>
                            </div>
                            <div className={"editionsContainer"}>
                                <p className={"nbEdition"}>Edition 2023</p>
                                <p className={"totalEdition"}>17 414 €</p>
                            </div>
                            <div className={"editionsContainer"}>
                                <p className={"nbEdition"}>Edition 2022</p>
                                <p className={"totalEdition"}>8 238 €</p>
                            </div>
                            <div className={"editionsContainer"}>
                                <p className={"nbEdition"}>Edition 2021</p>
                                <p className={"totalEdition"}>2 800 €</p>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        maxWidth: "650px",
                        display: "block",
                        margin: "auto",
                        marginTop: "60px",
                        marginBottom: "60px"
                    }}>
                        <p className={"paragraphHome"}>
                            <span>A quoi vont servir les dons de cette édition 2025 ?</span><br/>
                            Les dons récoltés seront utilisés pour financer des actions de sensibilisation et recruter un médiateur à mi-temps si la somme de <span>30 000 €</span> est atteinte.

                            <br/><br/><span>A quoi ont servi les dons des éditions précédentes ?</span>
                            <br/><br/>• <span>2021</span> : Imprimer des livrets de sensibilisation à destination des adolescents.
                            <br/><br/>• <span>2022</span> : Organiser des ateliers de prévention sur les risques liés à la fugue dans les collèges et les lycées.
                            <br/><br/>• <span>2023</span>: Créer et diffuser un spot de sensibilisation du 116 000 à la TV et à la radio et poursuivre l’organisation d’ateliers de sensibilisation aux risques liés à la fugue dans les collèges et les lycées.
                            <br/><br/>• <span>2024</span>: Imprimer les nouveaux flyers et affiches du 116 000, développer de nouveaux outils sur le site internet, le traduire en anglais et financer des ateliers de prévention dans les collèges et les lycées.
                        </p>
                        <a target={"_blank"} className={"makeDonation"} href={"https://streamlabscharity.com/teams/@stream-on-for-kids-2025/stream-on-for-kids-2025?l=fr-FR"}>Faire un don direct au 116 000<br/><small>(Sans inscriptions)</small></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Asso