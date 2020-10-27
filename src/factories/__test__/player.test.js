import PlayerHuman from '../Player';

test('PlayerHuman return an object with name and turn', () => {
    const newPlayer = PlayerHuman('Pepe');
    expect(newPlayer.getName()).toBe('Pepe');
    expect(newPlayer.getTurn()).toBe(true);
})

test('PlayerHuman changes turn', () => {
    const newPlayer = PlayerHuman('Pepe');
    expect(newPlayer.getTurn()).toBe(true);
    newPlayer.changeTurn();
    expect(newPlayer.getTurn()).toBe(false);
    newPlayer.changeTurn();
    expect(newPlayer.getTurn()).toBe(true);
})