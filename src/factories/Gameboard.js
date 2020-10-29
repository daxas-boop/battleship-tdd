import shipFactory from './Ship';

const Gameboard = () => {
    const coordinates = [
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

    const placeShipsRandomly = () => {
       fleet.forEach(ship => {
            let randomColumn = Math.floor(Math.random() * (10-ship.length+1));
            let randomRow = Math.floor(Math.random() * 10);

            const checkIfEmpty = () => {
                for (let i=0; i<=ship.length+1; i++) {
                    if(randomRow === 0) {
                        if(coordinates[randomRow+1][randomColumn+i] !==0||
                        coordinates[randomRow][randomColumn] !==0 ||
                        coordinates[randomRow][randomColumn+i] !==0 ||
                        coordinates[randomRow][randomColumn-1] !==0 ){
                            randomColumn = Math.floor(Math.random() * (10-ship.length+1));
                            randomRow = Math.floor(Math.random() * 10);
                            checkIfEmpty();
                        }
                    }
                    else if(randomRow === 9) {
                        if(coordinates[randomRow-1][randomColumn+i] !== 0 ||
                        coordinates[randomRow][randomColumn] !==0 ||
                        coordinates[randomRow][randomColumn+i] !==0 ||
                        coordinates[randomRow][randomColumn-1] !==0 ){
                            randomColumn = Math.floor(Math.random() * (10-ship.length+1));
                            randomRow = Math.floor(Math.random() * 10);
                            checkIfEmpty();
                        }
                    }
                    else {
                        if(coordinates[randomRow][randomColumn] !==0 ||
                        coordinates[randomRow][randomColumn+i] !==0 ||
                        coordinates[randomRow][randomColumn-1] !==0 ||
                        coordinates[randomRow+1][randomColumn+i] !==0 ||
                        coordinates[randomRow-1][randomColumn+i] !==0 ){ 
                            randomColumn = Math.floor(Math.random() * (10-ship.length+1));
                            randomRow = Math.floor(Math.random() * 10);
                            checkIfEmpty();
                        }
                    }
                }
            }
            checkIfEmpty(); //checks if there is a ship behind or in front of it

            for(let i=0; i < ship.length; i++){
                coordinates[randomRow].splice(randomColumn, 1, ship)
                randomColumn++;
            }
        })
    }
    placeShipsRandomly();

    const calculateShipPosition = (row, col) => {
        let rightPos=0;
        const ship = coordinates[row][col];
        for(let i=1; i<ship.length+1; i++) {
            if(ship === coordinates[row][col+i] || coordinates[row][col+i] === 'sunked ship'){
                rightPos++;
            }
        }
        return ship.length - rightPos - 1;
    }

    const receiveAttack = (cor1, cor2) => {
        if (typeof coordinates[cor1][cor2] === 'object') {
            const position = calculateShipPosition(cor1, cor2);
            coordinates[cor1][cor2].hit(position);
            coordinates[cor1][cor2] = 'sunked ship';
        } else {
            coordinates[cor1][cor2] = 'x'
        }
    }

    const allShipsSunk = () => {
        return fleet.every(ship => ship.isSunk());
    }

    const getCoordinates = () => coordinates;

    return {getCoordinates, receiveAttack, allShipsSunk};
}

export default Gameboard;
