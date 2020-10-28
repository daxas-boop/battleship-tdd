import PlayerHuman from '../Player';

test('PlayerHuman return an object with name and turn', () => {
    const newPlayer = PlayerHuman('Pepe');
    expect(newPlayer.getName()).toBe('Pepe');
    expect(newPlayer.turn).toBe(true);
})
