const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const earthRadius = 6371;

    const lat1Rad = toRadians(lat1);
    const lng1Rad = toRadians(lng1);
    const lat2Rad = toRadians(lat2);
    const lng2Rad = toRadians(lng2);

    const deltaLat = lat2Rad - lat1Rad;
    const deltaLon = lng2Rad - lng1Rad;

    //Haversine formula
    const a = 
        Math.sin(deltaLat / 2) ** 2 + 
        Math.cos(lat1Rad) * 
        Math.cos (lat2Rad) * 
        Math.sin(deltaLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

export default calculateDistance;