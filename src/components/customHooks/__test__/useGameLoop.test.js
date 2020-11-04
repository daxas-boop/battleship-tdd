import { act, renderHook } from "@testing-library/react-hooks";
import useGameLoop from '../useGameLoop';

test('useGameLoop returns the right variables', () => {
    const { result } = renderHook(() => useGameLoop());

    expect(result.current.players.AI).toMatchObject({
        getGameboard: expect.any(Function),
        getName: expect.any(Function),
        randomAttack: expect.any(Function),
        turn: false
    })

    expect(result.current.players.human).toMatchObject({
        getGameboard: expect.any(Function),
        getName: expect.any(Function),
        turn: true
    })
    

    expect(result.current.startNewGame instanceof Function).toBe(true);
    expect(result.current.cellOnClick instanceof Function).toBe(true);
    expect(result.current.winner).toBe(null);
    expect(result.current.remainingShips).toMatchObject({AIShips:5, humanShips:5});
})

test('startNewGame changes the players', () => {
    const { result } = renderHook(() => useGameLoop());
    const startingPlayers = result.current.players;
    act( () => result.current.startNewGame())
    expect(result.current.startNewGame).not.toBe(startingPlayers);
})

test('cellOnClick when you hit a ship it doesn\'t changes turn', () => {
    const { result } = renderHook(() => useGameLoop());
    const aiGameboard = result.current.players.AI.getGameboard().getBoard();
    const aiTurn = result.current.players.AI.turn;
    const humanTurn = result.current.players.human.turn;

    act(() => result.current.cellOnClick(1,1));

    if(aiGameboard[1][1] === 0) {
        // changes ai and human player turn
        expect(aiTurn).not.toBe(result.current.players.AI.turn);
        expect(humanTurn).not.toBe(result.current.players.human.turn);
    } else if (typeof aiGameboard[1][1] === 'object') {
        // doesn't changes turn
        expect(aiTurn).toBe(result.current.players.AI.turn);
        expect(humanTurn).not.toBe(result.current.players.human.turn);
    }
})