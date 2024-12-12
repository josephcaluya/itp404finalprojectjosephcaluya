import { Link, useNavigate, useLoaderData } from "react-router-dom";
import '../App.css'
import { toast } from 'react-toastify'
import { useEffect } from 'react';

export default function Place() {
  const {user, entry} = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Diary Entry Details Page";
  }, []);

  return(
    <div className="container home card">
      <div className="card-header entry-border">
        <h1>{entry.title}</h1>
        <h3 className="py-4">Visited by {user.name}</h3>
      </div>
      <div className="card-body entry-body">
        <div className="text-center">
          <img src={entry.photo} className="post-image" alt={entry.title} />
        </div>
        <p className="py-3">Type of Attraction: {entry.attractionType}</p>
        {entry.coordinates && <p className="py-3">Coordinates: {entry.coordinates.latitude}, {entry.coordinates.longitude}</p>}
        <p className="py-3">{entry.description}</p>
      </div>
      <div className="card-footer entry-border">
        <div className="d-flex justify-content-between">
          <Link to={`/entries`}>
            <button className="btn btn-primary mx-3">Back to Visited Places</button>
          </Link>

          <Link to={`/entries/${entry.id}/edit`}>
            <button className="btn btn-warning mx-3">Edit</button>
          </Link>

          <button 
            className="btn btn-danger mx-3"
            data-testid={`delete-entry-button-${entry.id}`}
            onClick={() => {
              const deleteMessage = window.confirm('Are you sure you want to delete this entry?');
              if(deleteMessage) {
                fetch(`http://localhost:4000/entries/${entry.id}`, {
                  method: "DELETE",
                }).then(() => {
                  navigate(`/entries`);
                  toast.success('Your entry was successfully deleted.');
                })
              }
            }}>
              Delete
            </button>

          <Link to={`/`}>
            <button className="btn btn-primary mx-3">Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}