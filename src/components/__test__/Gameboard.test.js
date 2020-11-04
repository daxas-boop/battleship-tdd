import React from 'react';
import Gameboard from '../Gameboard';
import { fireEvent, render, screen } from "@testing-library/react";

const mockCallback = jest.fn(x => x)

const providerProps = {
    humanGameboard: [
        [{},{}],
        ['sunked ship','x']
    ],
    aiGameboard:[
        [0,{}],
        ['sunked ship','x']
    ],
    shipsRemaining: {humanShips:5,aiShips:5},
    cellOnClick: mockCallback
}

test('Cell on click calls cellOnClick', () => {
    render(<Gameboard {...providerProps} />);

    expect(screen.queryAllByTestId('cell')[0]).toBeInTheDocument();
    fireEvent.click(screen.queryAllByTestId('cell')[0]);
    expect(mockCallback.mock.calls.length).toBe(1);
})

test('Human gameboard renders correctly.', () => {

})

test('Ai gameboard renders correctly.', () => {

})
