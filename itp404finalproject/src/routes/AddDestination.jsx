import { toast } from "react-toastify";
import DestinationForm from "../DestinationForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AddDestination() {
    useEffect(() => {
        document.title = "Add Destination to Wishlist";
    }, []);
    const navigate = useNavigate();
    return (
        <DestinationForm onSubmit={(newPlace) => {
            fetch(`http://localhost:4000/users`)
              .then((response) => response.json())
              .then((users) => {
                const existingUser = users.find((user) => user.name === newPlace.name);
                if (existingUser) {
                  return existingUser.id;
                } else {
                  const newUser = {
                    name: newPlace.name,
                  };
                  return fetch(`http://localhost:4000/users`, {
                    method: "POST",
                    body: JSON.stringify(newUser),
                    headers: {
                      "Content-type": "application/json",
                    },
                  })
                  .then((response) => response.json())
                  .then((createdUser) => createdUser.id);
                }
              })
              .then((userId) => {
                const destinationData = {
                  userId,
                  name: newPlace.destination,
                  attraction: newPlace.attraction,
                };
          
                return fetch("http://localhost:4000/destinations", {
                  method: "POST",
                  body: JSON.stringify(destinationData),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
              })
              .then((response) => response.json())
              .then(() => {
                navigate("/viewdestinations")
                toast.success("Successfully added a destination!")
              });
          }}/>
    );
}