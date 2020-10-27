const shipFactory = (length) => {
    const shipLife = new Array(length).fill('o');

    const hit = (position) => {
        if (position < 0 || typeof position === 'undefined') return;
        shipLife.splice(position, 1, 'hit');
    }

    const isSunk = () => shipLife.every((val) => val === 'hit');

    return {length, hit, isSunk}
}

export default shipFactory;