const PlayerHuman = (name, gameboard) => {
    let turn = true;
    const getName = () => name;
    const getGameboard = () => gameboard;

    return {getName, turn, getGameboard}
}

export default PlayerHuman;