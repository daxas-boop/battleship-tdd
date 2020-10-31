import shipFactory from './Ship';

const Gameboard = () => {
    const board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    const fleet = [
        shipFactory(5),
        shipFactory(4),
        shipFactory(3),
        shipFactory(2),
        shipFactory(1)
    ]

    const placeShipHorizontally = (coordinates, ship) => {
        let {row, column} = coordinates;
        for(let i=0; i < ship.length; i++){
            board[column].splice(row, 1, ship)
            row++;
        }
    }

    const placeShipVertically = (coordinates, ship) => {
        let {row, column} = coordinates;
        for(let i=0; i < ship.length; i++){
            board[column].splice(row, 1, ship)
            column++;
        }
    }

    const getRandomCoordinates = (ship, vertical) => {
        if(vertical){
            const row = Math.floor(Math.random() * 10);
            const column = Math.floor(Math.random() * (10-ship.length));
            return {row, column}
        } else {
            const row = Math.floor(Math.random() * (10-ship.length+1));
            const column = Math.floor(Math.random() * 10);
            return {row, column}
        }
    }

    const placeShipsRandomly = () => {
        fleet.forEach(ship => {
            const vertical = Math.random() > 0.5;
            if(vertical){
                let coordinates = getRandomCoordinates(ship, vertical);
                while(!validVerticalCoordinates(board, coordinates, ship)){
                    coordinates = getRandomCoordinates(ship, vertical);
                }
                placeShipVertically(coordinates, ship);
            } else {
                let coordinates = getRandomCoordinates(ship);
                while(!validHorizontalCoordinates(board, coordinates, ship)){
                    coordinates = getRandomCoordinates(ship);
                }
                placeShipHorizontally(coordinates, ship);
            }
        })
    }
    placeShipsRandomly();

    const calculateShipPosition = (col, row) => {
        const ship = board[col][row];
        let i = 0;
        let b = 0;
        if (col === 9) {
            while(board[col][row+i] === ship || board[col][row+i] === 'sunked ship') i++;
        } else {
            while(board[col][row+i] === ship || board[col][row+i] === 'sunked ship'){
                i++;
            }
    
            while(board[col+b][row] === ship || board[col+b][row] === 'sunked ship'){
                b++;
            }
        }
        if(i > 1) {
            return ship.length - i
        }
        else if(b > 1) {
            return ship.length - b
        }
        else{
            return ship.length - i
        }
    }

    const receiveAttack = (column, row) => {
        if (typeof board[column][row] === 'object') {
            const position = calculateShipPosition(column, row);
            board[column][row].hit(position);
            board[column][row] = 'sunked ship';
        } else {
            board[column][row] = 'x'
        }
    }

    const allShipsSunk = () => {
        return fleet.every(ship => ship.isSunk());
    }

    const getShipsRemaining = () => {
        let acc = 0;
        fleet.forEach( (ship) => {
            if(!ship.isSunk()) acc++;
        })
        return acc;
    }

    const getBoard = () => board;

    return {getBoard, receiveAttack, allShipsSunk, getShipsRemaining};
}

export default Gameboard;

const validVerticalCoordinates = (board,coordinates,ship) => {
    let {row,column} = coordinates;

    for (let i=0; i<=ship.length; i++) {
        if(column === 0) {
            //checks the sides
            if(typeof board[column+i][row-1] === 'object' || typeof board[column+i][row+1] === 'object'){ 
                return false
            }

            //checks down
            if(typeof board[column+i][row] === 'object'){
                return false
            }
        }
        else if(column === 9) {
            //checks the sides
            if(typeof board[column-1][row+1] === 'object' || typeof board[column-1][row-1] === 'object'){ 
                return false
            }

            //checks up
            if(typeof board[column-1][row] === 'object'){
                return false
            }
        }
        else {
            //checks the sides
            if(typeof(board[column+i][row-1]) === 'object' || typeof(board[column+i][row+1]) === 'object'){ 
                return false
            }
    
            //checks down
            if(typeof board[column+i][row] === 'object'){
                return false
            }
    
            //checks up
            if(typeof board[column-1][row-1] === 'object' || typeof board[column-1][row+1] === 'object' 
            || typeof board[column-1][row] === 'object'){
                return false
            }
        }
    }

    return true;
}

const validHorizontalCoordinates = (board,coordinates,ship) => {
    let {row,column} = coordinates;

    for (let i=0; i<=ship.length; i++) {
        if(column === 0) {
            //checks the sides
            if(typeof board[column][row+i] === 'object' || typeof board[column][row-1] === 'object'){ 
                return false
            }

            //checks down
            if(typeof board[column+1][row+i] === 'object'|| typeof board[column+1][row-1] === 'object'){
                return false
            }
        }
        else if(column === 9) {
            //checks the sides
            if(typeof board[column][row+i] === 'object' || typeof board[column][row-1] === 'object'){ 
                return false
            }

            //checks up
            if(typeof board[column-1][row+i] === 'object' || typeof board[column-1][row-1] === 'object'){
                return false
            }
        }
        else {
            //checks the sides
            if(typeof(board[column][row+i]) === 'object' || typeof(board[column][row-1]) === 'object'){ 
                return false
            }
    
            //checks down
            if(typeof board[column+1][row+i] === 'object' || typeof board[column+1][row-1] === 'object'){
                return false
            }
    
            //checks up
            if(typeof board[column-1][row+i] === 'object' || typeof board[column-1][row-1] === 'object'){
                return false
            }
        }
    }

    return true;
}
