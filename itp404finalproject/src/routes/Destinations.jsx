import Destination from "../Destination";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Destinations() {
    const [destinations, setDestinations] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        document.title = "Destination Wishlist Page";
        const fetchData = async () => {
          try {
            const destinationsResponse = await fetch("http://localhost:4000/destinations");
            const usersResponse = await fetch("http://localhost:4000/users");
            const destinationsData = await destinationsResponse.json();
            const usersData = await usersResponse.json();
    
            setDestinations(destinationsData);
            setUsers(usersData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
        }, []);

        const getUserName = (userId) => {
            const user = users.find((u) => u.id === userId);
            return user ? user.name : "Unknown User";
        };

    return (
        <div className="container destinations my-5 py-3">
            <h1 className="text-center py-5">Destination Wishlist</h1>
            {destinations.map((destination) => (
                <Destination
                key={destination.id}
                isExpanded={true}
                renderTriggerIcon={(isExpanded) => (
                    <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
                )}
                destinationId={destination.id}
                name={destination.name}
                user={getUserName(destination.userId)}
                attraction={destination.attraction}
                />
            ))}
            <Link to={"/"}><button>Back to Home</button></Link>
        </div>
    );
}