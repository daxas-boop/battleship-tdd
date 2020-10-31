const AIPlayer = (gameboard) => {
    let turn = false;

    const coordinates = [];
    for(let a=0; a<10;a++){
        for(let i=0; i<10;i++){
            coordinates.push([a,i])
        }
    }
    
    const randomAttack = () => {
        const randomIndex = Math.floor(Math.random() * coordinates.length);
        const randomCoordinate = coordinates[randomIndex];
        coordinates.splice(randomIndex,1)
        return [randomCoordinate[0], randomCoordinate[1]]
    }

    const getGameboard = () => gameboard;
    const getName = () => 'AI'

    return {randomAttack, turn, getGameboard, getName}
}

export default AIPlayer;
