import shipFactory from '../Ship';

test('shipFactory returns an object', () => {
    const smallShip = shipFactory();
    expect(typeof smallShip).toBe('object');
});

test('shipFactory returns length', () => {
    const smallShip = shipFactory(2);
    expect(smallShip.length).toBe(2);
    const bigShip = shipFactory(4);
    expect(bigShip.length).toBe(4);
});

test('ship hit with no position return undefined' , () => {
    const smallShip = shipFactory(2);
    expect(smallShip.hit()).toBe(undefined);
})

test('ship isSunk method works', () => {
    const mediumShip = shipFactory(3);
    expect(mediumShip.isSunk()).toBe(false);
    mediumShip.hit(1);
    expect(mediumShip.isSunk()).toBe(false);
    mediumShip.hit(0);
    expect(mediumShip.isSunk()).toBe(false);
    mediumShip.hit(2);
    expect(mediumShip.isSunk()).toBe(true);
})