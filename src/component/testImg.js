import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import {useCookies} from "react-cookie";

function TestImg() {
    return (
        <>
            <svg style={{width: "100%"}} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 2048 2048">
                <image src={"images/team.png"} style="width: 2048px;"></image>
                <a href="#" title="">
                    <g>
                        <polygon className="image-mapper-shape selected" data-index="1"
                                 points="824.646 1201.96 849.93 1131.94 886.883 1135.83 900.498 1161.12 886.883 1180.57 886.883 1200.02 931.616 1215.57 947.176 1268.09 925.782 1320.6 921.892 1375.06 916.057 1437.3 916.057 1472.3 912.167 1507.31 908.277 1542.32 916.057 1608.45 908.277 1686.24 886.883 1674.58 774.078 1686.24 758.518 1670.69 797.417 1406.18 799.362 1336.16 787.692 1268.09 803.252 1219.46"></polygon>
                    </g>
                </a>
            </svg>
        </>
    );
}

export default TestImg;
