import { useState, useEffect } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import VisitedCard from "../VisitedCard";
import { toast } from "react-toastify";
import "../App.css"
import { Link } from "react-router-dom";

export default function Favorites() {

    const [entries, setEntries] = useState([]);
    const [users, setUsers] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        document.title = "Favorite Places Page";
        const fetchData = async () => {
          try {
            const entriesResponse = await fetch("http://localhost:4000/entries");
            const usersResponse = await fetch("http://localhost:4000/users");
            const favoritesResponse = await fetch("http://localhost:4000/favorites");
            const entriesData = await entriesResponse.json();
            const usersData = await usersResponse.json();
            const favoritesData = await favoritesResponse.json();
    
            setEntries(entriesData);
            setUsers(usersData);
            setFavorites(favoritesData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);

    const favoriteEntryIds = favorites.map((favorite) => favorite.entryId);
    const favoriteEntries = entries.filter((entry) => favoriteEntryIds.includes(entry.id));
    const favoriteList = favorites.map((favorite) => favorite);

    const removeFavorite = async (entryId) => {
        const deleteMessage = window.confirm("Are you sure you want to remove this from favorites?");
        if (deleteMessage) {
            const favoriteToRemove = favorites.find((fav) => fav.entryId === entryId);
            await fetch(`http://localhost:4000/favorites/${favoriteToRemove.id}`, {
                method: 'DELETE',
            }).then(() => {
                toast.success("Entry successfully deleted from favorites.");
            })
            setFavorites(favorites.filter((fav) => fav.id !== favoriteToRemove.id));
        }
    }

    return (
        <div className="container home text-center row mb-5 mx-auto" id="entries">
            <h1 className="text-center my-5">Favorites</h1>
            {favoriteEntries.map((entry) => (
                <>
                <VisitedCard 
                    entry={entry} 
                    users={users} 
                    favorites={favoriteList} 
                    icon={faStar} 
                    color="gold" 
                    key={entry.id} 
                    remove="Remove from Favorites" 
                    onRemove={removeFavorite}
                />
                </>
            ))}
            <Link to={"/"}><button className="my-5">Back to Home</button></Link>
        </div>
    );

}