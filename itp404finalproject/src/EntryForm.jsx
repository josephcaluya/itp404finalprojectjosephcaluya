import { useState, useEffect } from "react";
import Input from "./Input";
import FormError from "./FormError";
import { getCoordinates } from "./GetCoordinates";
import { Link } from "react-router-dom";

export default function EntryForm(props) {
    const [users, setUsers] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [attractionType, setAttractionType] = useState(props.entry ? props.entry.attractionType : "");
    const [selectedUser, setSelectedUser] = useState(props.entry ? props.entry.userId : "");
    const [selectedAttraction, setSelectedAttraction] = useState(props.entry ? props.entry.destinationId : "");
    const [title, setTitle] = useState(props.entry ? props.entry.title : "");
    const [description, setDescription] = useState(props.entry ? props.entry.description : "");
    const [coordinates, setCoordinates] = useState(props.entry ? props.entry.coordinates : null);
    const [hasPhoto, setHasPhoto] = useState(props.entry ? true : false);
    const [photo, setPhoto] = useState(props.entry ? props.entry.photo : "");
    const [wantsCoordinates, setWantsCoordinates] = useState(props.entry ? "Yes" : "No");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errorList = {};
        if (!attractionType) errorList.attractionType = "Must select an attraction type.";
        if (!selectedUser) errorList.user = "Must select a user.";
        if (!selectedAttraction) errorList.selectedAttraction = "Must select an attraction.";
        if (!title.trim()) errorList.title = "Must enter a title.";
        if (!description.trim()) errorList.description = "Must enter a description.";
        if (!wantsCoordinates) errorList.coordinates = "Must indicate whether you want to get your coordinates or not.";
        if (hasPhoto && !photo.trim()) errorList.photoPaste = "Must paste a link to a photo.";
        setErrors(errorList);
        return Object.keys(errorList).length === 0;
    };

    const fetchCoordinates = () => {
        getCoordinates(
          (coords) => setCoordinates(coords),
          (error) => alert(`Geolocation Error: ${error}`)
        );
    };

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:4000/users").then((response) => response.json()),
            fetch("http://localhost:4000/destinations").then((response) => response.json()),
        ])
            .then(([usersData, destinationsData]) => {
                setUsers(usersData);
                setDestinations(destinationsData);
            })
    }, []);

    return (
        <>
        <h1 className="text-center pt-4">Travel Entry Submission Form</h1>
        <Link to={"/"}><button className="mx-5 mb-3">Back to Home</button></Link>
        <form method="post" onSubmit={(event) => {
            event.preventDefault();
            if (validateForm()) {
              props.onSubmit({
                userId: parseInt(selectedUser, 10),
                destinationId: parseInt(selectedAttraction, 10),
                attractionType,
                title,
                description,
                coordinates: wantsCoordinates === "Yes" ? coordinates : null,
                photo: hasPhoto ? photo : ""
              });

            }
        }}
        >
            <div className="container pt-4">
                
                <div className="my-3">
                    <label className="form-label" htmlFor="user">Select user:</label>
                    <select
                      className="form-select"
                      id="user"
                      value={selectedUser}
                      onChange={(event) => {
                        setSelectedUser(event.target.value);
                        errors.user="";
                      }}
                    >
                      <option value="">--Select a user--</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                </div>
                {errors.user && <FormError message={errors.user} />}

                <div className="my-3">
                    <label className="form-label" htmlFor="selectedAttraction">Select attraction:</label>
                    <select
                      className="form-select"
                      id="selectedAttraction"
                      value={selectedAttraction}
                      onChange={(event) => {
                        setSelectedAttraction(event.target.value);
                        errors.selectedAttraction="";
                      }}
                    >
                      <option value="">--Select an attraction--</option>
                      {destinations.map((destination) => (
                        <option key={destination.id} value={destination.id}>
                          {destination.attraction}
                        </option>
                      ))}
                    </select>
                </div>
                {errors.selectedAttraction && <FormError message={errors.selectedAttraction} />}


                <div className="my-3">
                  <label className="form-label" htmlFor="attractiontype">Attraction Type:</label>
                  <select className="form-select" id="attractiontype" value={attractionType} onChange={(event) => {
                      setAttractionType(event.target.value);
                      errors.attractionType = "";
                  }}
                  >
                      <option value=''>--Select an attraction type--</option>
                      <option value="landmark">Landmark/Cultural</option>
                      <option value="culinary">Culinary</option>
                      <option value="shopping">Shopping</option>
                      <option value="lodging">Lodging</option>
                      <option value="nature">Nature</option>
                      <option value="entertainment">Entertainment</option>
                  </select>
                </div>
                {errors.attractionType && <FormError message={errors.attractionType} />}

                <Input id="title" label="Post Title:" value={title} onChange={(newTitle) => {
                  setTitle(newTitle);
                  errors.title="";
                }} />
                {errors.title && <FormError message={errors.title} />}

                <div className="mb-3">
                  <label className="form-label" htmlFor="description">Description:</label>
                  <textarea className="form-control" id="description" rows="3" value={description} onChange={(event) => {
                      const value = event.target.value;
                      setDescription(value);
                      errors.description="";
                    }}
                  />
                </div>
                {errors.description && <FormError message={errors.description} />}

                
                <div className="form-check py-3">
                    <input
                    className="form-check-input"
                    type="checkbox"
                    checked={hasPhoto}
                    id="hasPhoto"
                    onChange={(event) => {
                        setHasPhoto(event.target.checked);
                    }}
                    >
                    </input>
                    <label htmlFor="hasPhoto">Check this box if you have a photo.</label>
                </div>

                {hasPhoto && 
                <>
                <Input id="photo" label="Paste a link of a photo here:" value={photo} onChange={(newPhoto) => {
                  setPhoto(newPhoto);
                  errors.photoPaste="";
                }}/> 
                 {errors.photoPaste && <FormError message={errors.photoPaste} /> }
                </>
                }

                <p>Do you want to get your current coordinates?</p> 
                <div className="mb-3">
                  <input 
                      className="form-check-input" 
                      type="radio" 
                      name="coordinates"
                      value={"Yes"}
                      checked={wantsCoordinates === "Yes"} 
                      id="coordinates"
                      onChange={() => {
                          setWantsCoordinates("Yes");
                      }}
                  />
                  <label className="form-check-label ms-1" htmlFor="coordinates">Yes</label>

                  <input 
                      className="form-check-input ms-2" 
                      type="radio"
                      name="coordinates"
                      value="No"
                      checked={wantsCoordinates === "No"} 
                      id="noCoordinates"
                      onChange={() => {
                          setWantsCoordinates("No");
                      }}
                  />
                  <label className="form-check-label ms-1" htmlFor="noCoordinates">No</label>
                </div>

              {wantsCoordinates === "Yes" && <div className="mb-3">
                <button type="button" className="btn btn-info" onClick={fetchCoordinates}>
                  Get Current Coordinates
                </button>
                {coordinates && (
                  <p className="mt-2">
                    Coordinates: {coordinates.latitude}, {coordinates.longitude}
                  </p>
                )}
              </div>}

              <button type="submit" className="btn btn-primary mb-5">
                  Submit
              </button>
            </div>
        </form>
        </>
    )
}