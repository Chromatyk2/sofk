import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import { useParams,BrowserRouter, Link } from 'react-router-dom'
import {Tooltip} from "react-tooltip";
import moment from "moment/moment";
function Items(props) {
    const clipList = props.currentItems;
    return (
        <>
            <>
                {clipList == [] ? (
                    <h1>Loading...</h1>
                ) : (
                    clipList.sort((a, b) => (a.view_count > b.view_count) ? 1 : -1).map((val, key) => {
                        return (
                            <>
                                <Link className="clipsLink navLink" to={val.url} target={"_blank"}>
                                    <img className={"imgClip"} src={val.thumbnail_url}/>
                                    <p className={"titleClip"}>{val.title.substring(0, 25) + "..."}</p>
                                    <div className={"infoClipContainer"}>
                                        <p className={"viewsClips"}>{val.view_count} vues</p>
                                        <p className={"dateClip"}>{moment(val.created_at).utc().format('DD/MM/YYYY')}</p>
                                    </div>
                                </Link>
                            </>
                        )
                    })
                )}
            </>
        </>
    );
}

function ClipsPaginate(props) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const [filteredClips, setFilteredClips] = useState(props.items);
    useEffect(() => {
        setFilteredClips(props.items);
    }, [props.items]);
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + props.itemsPerPage;
    const currentItems = filteredClips.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredClips.length / props.itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * props.itemsPerPage) % filteredClips.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className="clipsGlobalContainer">
                <ReactPaginate
                    className="paginateLay"
                    breakLabel="..."
                    nextLabel=""
                    previousLabel=""
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                />
                <Items currentItems={currentItems} />
                <ReactPaginate
                    className="paginateLay"
                    breakLabel="..."
                    nextLabel=""
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel=""
                    renderOnZeroPageCount={null}
                    style={{marginBottom:"150px"}}
                />
                <div style={{height:"150px"}}></div>
            </div>
        </>
    );
}

export default ClipsPaginate;