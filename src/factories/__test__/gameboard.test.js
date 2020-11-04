import Gameboard from '../Gameboard';

test('returns a gameboard with 10 length array', () => {
    const GAMEBOARD_LENGTH = 10;
    const newGameboard = Gameboard();
    expect(newGameboard.getBoard().length).toBe(GAMEBOARD_LENGTH);
})

test('places all the 15 ships on the gameboard', () => {
    const TOTAL_SIZE_SHIPS = 15; 
    const newGameboard = Gameboard();

    let shipsOnGameboard = 0;
    newGameboard.getBoard().forEach(array => {
        const numberOfShips = array.filter(value => typeof value === 'object')
        shipsOnGameboard += numberOfShips.length;
    });
    expect(shipsOnGameboard).toBe(TOTAL_SIZE_SHIPS)
})

test('receiveAttack attacks a ship or records the missed attack', () => {
    const newGameboard = Gameboard();
    expect(newGameboard.getBoard()[1][2] === 0 || typeof newGameboard.getBoard()[1][2] === 'object').toBeTruthy()
    newGameboard.receiveAttack(1,2)
    expect(newGameboard.getBoard()[1][2] === 'x' || newGameboard.getBoard()[1][2] === 'sunked ship').toBeTruthy()
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

test('Places the ships on random coordinates without touching each other', () => {
    const newGameboard = Gameboard();
    const board = newGameboard.getBoard();
    
    const checkValidity = (object,b,i) => {
        if (b === 9) {
            if(typeof board[b-1][i] === 'object' && board[b-1][i] !== object){
                return false
            } else if( typeof board[b][i-1] === 'object' && board[b][i-1] !== object) {
                return false
            } else if( typeof board[b][i+1] === 'object' && board[b][i+1] !== object) {
                return false
            }
            return true;
        }else if (b === 0) {
            if (typeof board[b+1][i] === 'object' && board[b+1][i] !== object) {
                return false
            } else if( typeof board[b][i-1] === 'object' && board[b][i-1] !== object) {
                return false
            } else if( typeof board[b][i+1] === 'object' && board[b][i+1] !== object) {
                return false
            }
            return true;
        } else {
            if(typeof board[b-1][i] === 'object' && board[b-1][i] !== object){
                return false
            } else if (typeof board[b+1][i] === 'object' && board[b+1][i] !== object) {
                return false
            } else if( typeof board[b][i-1] === 'object' && board[b][i-1] !== object) {
                return false
            } else if( typeof board[b][i+1] === 'object' && board[b][i+1] !== object) {
                return false
            }
            return true;
        }
    }

    for(let b=0; b<10; b++){
        for(let i=0; i<10; i++){
            if(typeof board[b][i] === 'object'){
                expect(checkValidity(board[b][i],b,i)).toBe(true)
            }
        }
    }
})
