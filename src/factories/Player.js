const PlayerHuman = (name, gameboard) => {
    let turn = true;

    const changeTurn = () => {
        turn = !turn
    }

    const getTurn = () => turn;
    const getName = () => name;
    const getGameboard = () => gameboard;

    return {getName, getTurn, changeTurn, getGameboard}
}

export default PlayerHuman;