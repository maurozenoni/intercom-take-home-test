abstract class GeopositionedEntity {
    abstract readonly latitude: string;
    abstract readonly longitude: string;
    
    distance(otherEntity: GeopositionedEntity): number {

        const earthRadius = 6371e3; // 6371 km

        // calculate latitudes and longitude delta in radians
        const lat1 = parseFloat(this.latitude) * Math.PI/180;
        const lat2 = parseFloat(otherEntity.latitude) * Math.PI/180;
        const longitudeDelta = (parseFloat(otherEntity.longitude) - parseFloat(this.longitude))* Math.PI/180;

        const centralAngle = Math.acos(Math.sin(lat1)*Math.sin(lat2) + Math.cos(lat1)*Math.cos(lat2) * Math.cos(longitudeDelta));

        return centralAngle * earthRadius;
    }
}

interface Customer extends GeopositionedEntity {
    readonly user_id: number;
    readonly name: string;
}

class Building extends GeopositionedEntity {
    constructor(readonly latitude: string, readonly longitude: string) {
        super()
    }    
}

export { Customer, Building }
