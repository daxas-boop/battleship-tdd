const shipFactory = (length) => {
    const shipLife = [];
    for (let i = 0; i < length ; i++) {
        shipLife.push('o')
    }

    const hit = (position) => {
        if (position < 0 || typeof position === 'undefined') return;
        shipLife.splice(position, 1, 'x');
        return shipLife;
    }

    const isSunk = () => shipLife.every( (val, i, arr) => val === arr[0] ) ? true: false

    return {length, hit, isSunk}
}

export default shipFactory;