
import React from 'react';
import {Link} from "react-router-dom";

function LinkToStream() {
    return (
        <Link className={"linkToTwitch"} to="/Streams"><i style={{color: "white"}} className="fa-brands fa-twitch"></i></Link>
    )
}

export default LinkToStream;
