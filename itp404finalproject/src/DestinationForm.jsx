import { useState } from "react";
import Input from "./Input";
import FormError from "./FormError";
import { Link } from "react-router-dom";

export default function DestinationForm(props) {
    const [name, setName] = useState(props.destination ? props.destination.userId : "");
    const [destination, setDestination] = useState(props.destination ? props.destination.name : "");
    const [attraction, setAttraction] = useState(props.destination ? props.destination.attraction : "");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errorList = {};
        if (!name.trim()) errorList.name = "Must enter your full name.";
        if (!destination.trim()) errorList.destination = "Must enter a destination.";
        if (!attraction.trim()) errorList.attraction = "Must enter an attraction.";
        setErrors(errorList);
        return Object.keys(errorList).length === 0;
    };

    return (
        <>
            <h1 className="text-center pt-4">Destination/Attraction Submission Form</h1>
            <form method="post" onSubmit={(event) => {
                event.preventDefault();
                if (validateForm()) {
                    props.onSubmit({
                        name,
                        destination,
                        attraction
                    });
                }
            }}
            >
                <div className="container pt-4">
                    <Input id="name" label="Full Name:" value={name} onChange={(newName) => {
                    setName(newName);
                    errors.name = "";
                    }} />
                    {errors.name && <FormError message={errors.name} />}
                    
                    <Input id="destination" label="Destination:" value={destination} onChange={(newDestination) => {
                    setDestination(newDestination);
                    errors.destination = "";
                    }} />
                    {errors.destination && <FormError message={errors.destination} />}

                    <Input id="attraction" label="Attraction Name:" value={attraction} onChange={(newAttraction) => {
                        setAttraction(newAttraction);
                        errors.attraction = "";
                    }} />
                    {errors.attraction && <FormError message={errors.attraction} />}

                <button type="submit" className="btn btn-primary mb-5">
                    Submit
                </button>
                </div>
            </form>
            <Link to={"/"}><button className="mx-5">Back to Home</button></Link>
        </>
    );
}
