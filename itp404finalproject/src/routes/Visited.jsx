import { useState, useEffect } from "react";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import VisitedCard from "../VisitedCard";
import "../App.css"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Visited() {
    const [entries, setEntries] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title= "Travel Diary Entries";
        const fetchData = async () => {
          try {
            const entriesResponse = await fetch("http://localhost:4000/entries");
            const usersResponse = await fetch("http://localhost:4000/users");
            const entriesData = await entriesResponse.json();
            const usersData = await usersResponse.json();
    
            setEntries(entriesData);
            setUsers(usersData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);

    const addFavorite = async (entryId, userId) => {
        const response = await fetch("http://localhost:4000/favorites", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            entryId,
            userId,
            favoritedAt: new Date().toISOString(),
        }),
        }).then(() => {
            navigate("/favorites");
            toast.success("You successfully added this place to favorite places.")
        });
    };

    const addDislike = async (entryId, userId) => {
        const response = await fetch("http://localhost:4000/dislikes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            entryId,
            userId,
        }),
        }).then(() => {
            navigate("/dislikes");
            toast.success("You successfully added this place to disliked places.")
        });
    };

    return (
        <div className="container home text-center row mb-5 mx-auto" id="entries">
            <h1 className="text-center my-5">Visited Places</h1>
            {entries.map((entry) => (
                <>
                <VisitedCard 
                    entry={entry} 
                    users={users} 
                    icon={faPlane} 
                    color="#ac92a6" 
                    key={entry.id}
                    addFav={true}
                    addDis={true}
                    onAddFav={(entryId) => addFavorite(entryId, entry.userId)}
                    onAddDis={(entryId) => addDislike(entryId, entry.userId)}
                />
                </>
            ))}
            <Link to={"/"}><button className="my-5">Back to Home</button></Link>
        </div>
    );

}