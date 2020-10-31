const PlayerHuman = (gameboard) => {
    let turn = true;
    const getName = () => 'HUMAN';
    const getGameboard = () => gameboard;

    return {getName, turn, getGameboard}
}

export default PlayerHuman;
