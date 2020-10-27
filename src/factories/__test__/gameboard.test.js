import Gameboard from '../Gameboard';

test('returns a gameboard with 10 length array', () => {
    const GAMEBOARD_LENGTH = 10;
    const newGameboard = Gameboard();
    expect(newGameboard.getCoordinates().length).toBe(GAMEBOARD_LENGTH);
})

test('places all the 15 ships on the gameboard', () => {
    const TOTAL_SIZE_SHIPS = 15; 
    const newGameboard = Gameboard();

    let shipsOnGameboard = 0;
    newGameboard.getCoordinates().forEach(array => {
        const numberOfShips = array.filter(value => typeof value === 'object')
        shipsOnGameboard += numberOfShips.length;
    });
    expect(shipsOnGameboard).toBe(TOTAL_SIZE_SHIPS)
})

test('receiveAttack attacks a ship or records the missed attack', () => {
    const newGameboard = Gameboard();
    expect(newGameboard.getCoordinates()[1][2] === 0 || typeof newGameboard.getCoordinates()[1][2] === 'object').toBeTruthy()
    newGameboard.receiveAttack(1,2)
    expect(newGameboard.getCoordinates()[1][2] === 'x' || newGameboard.getCoordinates()[1][2] === 'sunked ship').toBeTruthy()
})

test('allShipsSunk detects when all ship got sinked', () => {
    const newGameboard = Gameboard();
    expect(newGameboard.allShipsSunk()).toBe(false);
    for(let i=0; i<10;i++){
        for(let b=0; b<10;b++){
            newGameboard.receiveAttack(i,b)
        }   
    }
    expect(newGameboard.allShipsSunk()).toBe(true);
})
