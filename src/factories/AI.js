const AIPlayer = (gameboard) => {
    let turn = false;
    
    const alreadyAttacked = [];
    
    const changeTurn = () => {
        turn= !turn
    }

    const randomAttack = () => {
        const randomColumn = Math.floor(Math.random()*10);
        const randomRow = Math.floor(Math.random()*10);
        if (alreadyAttacked.includes([randomColumn,randomRow])){
            randomAttack();
        } else {
            alreadyAttacked.push([randomColumn, randomRow]);
        }
        return [randomColumn, randomRow]
    }

    const getTurn = () => turn;
    const getGameboard = () => gameboard;

    return {randomAttack, getTurn, changeTurn, getGameboard}
}

export default AIPlayer;
