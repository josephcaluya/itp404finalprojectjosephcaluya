import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import VisitedCard from "../VisitedCard";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../App.css"
import { Link } from "react-router-dom";

export default function Dislikes () {
    const [entries, setEntries] = useState([]);
    const [users, setUsers] = useState([]);
    const [dislikes, setDislikes] = useState([]);

    useEffect(() => {
        document.title = "Disliked Places Page";
        const fetchData = async () => {
          try {
            const entriesResponse = await fetch("http://localhost:4000/entries");
            const usersResponse = await fetch("http://localhost:4000/users");
            const dislikesResponse = await fetch("http://localhost:4000/dislikes");
            const entriesData = await entriesResponse.json();
            const usersData = await usersResponse.json();
            const dislikesData = await dislikesResponse.json();
    
            setEntries(entriesData);
            setUsers(usersData);
            setDislikes(dislikesData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);

    const dislikeEntryIds = dislikes.map((dislike) => dislike.entryId);
    const dislikedEntries = entries.filter((entry) => dislikeEntryIds.includes(entry.id));
    const removeDislike = async (entryId) => {
        const deleteMessage = window.confirm("Are you sure you want to remove this from dislikes?");
        if (deleteMessage) {
            const dislikeToRemove = dislikes.find((dis) => dis.entryId === entryId);
            await fetch(`http://localhost:4000/dislikes/${dislikeToRemove.id}`, {
                method: 'DELETE',
            })
            setDislikes(dislikes.filter((dis) => dis.id !== dislikeToRemove.id));
            toast.success("Entry successfully deleted from dislikes.");
        }
    }

    return (
        <div className="container home text-center row mb-5 mx-auto" id="entries">
            <h1 className="text-center my-5">Disliked Places</h1>
            {dislikedEntries.map((entry) => (
                <>
                <VisitedCard 
                    entry={entry} 
                    users={users} 
                    icon={faThumbsDown} 
                    color="red" 
                    key={entry.id} 
                    remove="Remove from Disliked Places" 
                    onRemove={removeDislike}
                />
                </>
            ))}
            <Link to={"/"}><button className="my-5">Back to Home</button></Link>
        </div>
    );

}