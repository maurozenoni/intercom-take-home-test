import { expect } from "chai";
import { Customer, Building } from "../src/Entities";

describe('GeopositionedEntity', () => {

    // Reference distances between entities were calculated using the "ruler" tool in Google Earth Pro
    describe('#distance()', () => {

        it('can measure the distance between two buildings at the same location', () => {
            const building1 = new Building("52.265875", "-6.194998");
            const building2 = new Building("52.265875", "-6.194998");
            expect(building1.distance(building2)).to.equal(0);
            expect(building2.distance(building1)).to.equal(0);
        })
    
        it('can measure the distance between two buildings 300m apart (+/- 5m accuracy)', () => {
            const building1 = new Building("53.339428", "-6.257664");
            const building2 = new Building("53.338440", "-6.253493");
            expect(building1.distance(building2)).to.be.within(295, 305);
            expect(building2.distance(building1)).to.be.within(295, 305);
        })
    
        it('can measure the distance between two buildings 119km apart (+/- 1km accuracy)', () => {
            const building1 = new Building("53.339428", "-6.257664");
            const building2 = new Building("52.265875", "-6.194998");
            expect(building1.distance(building2)).to.be.within(118e3, 120e3);
            expect(building2.distance(building1)).to.be.within(118e3, 120e3);
        })

        it('can measure the distance between a building and a customer 99km apart (+/- 1km accuracy)', () => {
            const building = new Building("53.339428", "-6.257664");
            const customer: Customer = JSON.parse('{"latitude": "52.448330", "user_id": 8, "name": "Customer One", "longitude": "-6.353161"}');
            expect(building.distance(customer)).to.be.within(98e3, 100e3);
        })
        
        it('can measure the distance between two buildings 17231km apart (+/- 10km accuracy)', () => {
            const building1 = new Building("53.339428", "-6.257664");
            const building2 = new Building("-35.282010", "149.128750");
            expect(building1.distance(building2)).to.be.within(17221e3, 17241e3);
            expect(building2.distance(building1)).to.be.within(17221e3, 17241e3);
        })
    });
});
