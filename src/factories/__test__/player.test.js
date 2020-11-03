import createHumanPlayer from '../Player';

test('getGameboard returns the passed parameter', () => {
    const newPlayer = createHumanPlayer([0,1,3,4,5]);
    expect(newPlayer.getGameboard()).toStrictEqual([0,1,3,4,5])
})


test('turn default should be true', () => {
    const newPlayer = createHumanPlayer();
    expect(newPlayer.turn).toBe(true);
})

test('getName returns "AI"', () => {
    const newPlayer = createHumanPlayer();
    expect(newPlayer.getName()).toBe('HUMAN')
})
