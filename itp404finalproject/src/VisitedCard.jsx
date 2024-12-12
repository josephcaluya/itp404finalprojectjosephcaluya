import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './App.css'
import { Link } from "react-router-dom";

export default function VisitedCard(props) {
    const getUserName = (userId) => {
        const user = props.users.find((u) => u.id === userId);
        return user.name;
    }

    const getDate = (entryId) => {
        const favorite = props.favorites.find((f) => f.entryId === entryId);
        return new Date(favorite.favoritedAt).toLocaleString();
    }

    return(
        <div className="col-sm-6 mb-3" key={props.key}>
            <div className="card">
                <FontAwesomeIcon
                    className="card-icon"
                    icon={props.icon}
                    color={props.color}
                />
                <img
                    src={props.entry.photo}
                    className="card-img-top"
                    alt={props.entry.title}
                />
                <div className="card-body">
                    <h5 className="card-title">{props.entry.title}</h5>
                    <p className="card-text">Visited by {getUserName(props.entry.userId)}</p>
                    {props.favorites && <p>This place was favorited at: {getDate(props.entry.id)}</p> }
                    <Link to={`/entries/${props.entry.id}`}>
                        <button className="btn btn-primary">See More</button>
                    </Link>
                    {props.remove && 
                        <button className="btn btn-danger mx-5" onClick={() => props.onRemove(props.entry.id)}>
                            {props.remove}
                        </button>
                    }
                    {props.addFav && (
                        <button className="btn btn-warning mx-3" onClick={() => props.onAddFav(props.entry.id)}>
                            Add to Favorites
                        </button>
                    )}
                    {props.addDis && (
                        <button className="btn btn-danger" onClick={() => props.onAddDis(props.entry.id)}>
                            Add to Disliked Places
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}