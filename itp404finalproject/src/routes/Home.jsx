import { faPlaneDeparture, faPersonWalkingLuggage, faTrainTram, faBook, faMapLocationDot, faPassport, faBookmark, faCircleExclamation, faThumbsDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Home.css';
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        document.title = "Travel Wishlist & Diary Home Page";
    }, []);
    return(
        <div className="container text-center home justify-content-between">
            <h1 className="py-4">Travel Wishlist + Diary</h1>
            <FontAwesomeIcon className="home-icon" icon={faPlaneDeparture} color="#454ADE" />
            <FontAwesomeIcon className="home-icon" icon={faPersonWalkingLuggage} color="#454ADE" />
            <FontAwesomeIcon className="home-icon" icon={faTrainTram} color="#454ADE" />
            <div className="d-flex flex-column">
            <Link to={`/adddestination`}>
                <button className="home-button d-flex align-items-center justify-content-center mx-auto my-5 py-3">
                    Add Destination to Wishlist
                    <FontAwesomeIcon className="home-icon" icon={faMapLocationDot} color="#454ADE" />
                </button>
            </Link>

            <Link to={`/viewdestinations`}>
            <button className="home-button d-flex align-items-center mx-auto justify-content-center mb-5 py-3">
                See Wishlist
                <FontAwesomeIcon className="home-icon" icon={faCircleExclamation} color="#454ADE" />
            </button>
            </Link>

            <Link to={`/addentry`}>
            <button className="home-button d-flex align-items-center justify-content-center mx-auto mb-5 py-3">
                Visited a destination? Add a Diary Entry!
                <FontAwesomeIcon className="home-icon" icon={faBook} color="#454ADE" />
            </button>
            </Link>

            <Link to={`/entries`}>
            <button className="home-button d-flex align-items-center mx-auto justify-content-center mb-5 py-3">
                See Entries of Visited Places
                <FontAwesomeIcon className="home-icon" icon={faPassport} color="#454ADE" />
            </button>
            </Link>

            <Link to={`/favorites`}>
            <button className="home-button d-flex align-items-center mx-auto justify-content-center mb-5 py-3">
                See Favorite Places
                <FontAwesomeIcon className="home-icon" icon={faBookmark} color="#454ADE" />
            </button>
            </Link>

            <Link to={`/dislikes`}>
            <button className="home-button d-flex align-items-center mx-auto justify-content-center mb-5 py-3">
                See Disliked Places
                <FontAwesomeIcon className="home-icon" icon={faThumbsDown} color="#454ADE" />
            </button>
            </Link>
            </div>
      </div>
    );
}