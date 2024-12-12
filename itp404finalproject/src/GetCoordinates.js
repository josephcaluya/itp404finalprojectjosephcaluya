export const getCoordinates = (onSuccess, onError) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            const coordinates = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };
            onSuccess(coordinates);
        },
        (error) => {
            if (onError) {
                onError(error.message);
            } else {
                console.error("Error fetching location:", error.message);
                alert("Unable to retrieve location. Please try again.");
            }
        }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
};