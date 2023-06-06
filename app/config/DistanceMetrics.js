export const calculateDistance = (userLatitude, userLongitude, stopLatitude, stopLongitude) => {
    const toRadians = (value) => (value * Math.PI) / 180; // Helper function to convert degrees to radians
  
    const earthRadius = 6371; // Radius of the Earth in kilometers
  
    const phi1 = toRadians(userLatitude);
    const phi2 = toRadians(stopLatitude);
    const deltaPhi = toRadians(stopLatitude - userLatitude);
    const deltaLambda = toRadians(stopLongitude - userLongitude);
  
    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = earthRadius * c;
  
    // Convert distance to meters and round to two decimal places
    return Math.round(distance * 1000);
  };
  