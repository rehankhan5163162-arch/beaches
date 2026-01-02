function showOnMap(lat, lng) {
    if (!lat || !lng) {
        alert("Location coordinates not available.");
        return;
    }

    // Check if Geolocation is supported
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Success: Open Google Maps with directions from user location to beach
                const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                window.open(url, '_blank');
            },
            (error) => {
                // Error or Permission Denied: Just open the location on map
                console.warn("Geolocation permission denied or error. Opening map directly.", error);
                const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
                window.open(url, '_blank');
            }
        );
    } else {
        // Fallback for browsers without geolocation
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        window.open(url, '_blank');
    }
}
