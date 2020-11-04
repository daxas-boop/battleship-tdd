import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import Game from '../Game';

test('renders correctly', () => {
  const component = renderer.create(<Game />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("New Game onClick renders gameboards", () => {
  render(<Game />);
  expect(screen.queryByTestId('human-gameboard')).toBe(null);
  expect(screen.queryByTestId('ai-gameboard')).toBe(null);
  fireEvent.click(screen.getByText("New game"));
  expect(screen.queryByTestId('human-gameboard')).toBeInTheDocument();
  expect(screen.queryByTestId('ai-gameboard')).toBeInTheDocument();
  expect(screen.queryByText("New game")).toBe(null);
});

test("How to Play button renders How to play tab", () => {
render(<Game />);

  expect(screen.getByText("How to Play")).toBeInTheDocument();
  fireEvent.click(screen.getByText("How to Play"));
  expect(screen.queryByTestId('how-to-play')).toBeInTheDocument();
});

test("Continue button closes the How to play tab", () => {
  render(<Game />);

  fireEvent.click(screen.getByText("How to Play"));
  expect(screen.queryByTestId('how-to-play')).toBeInTheDocument();
  expect(screen.getByText('Continue')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Continue'));
  expect(screen.queryByTestId('how-to-play')).toBe(null);
});

describe('WinnerContainer works properly', () => {

  test("WinnerContainers render when we have winner", () => {
    render(<Game />);
    fireEvent.click(screen.getByText("New game"));
    expect(screen.queryByTestId('winner-container')).toBe(null);
    jest.useFakeTimers();
    for(let i=0; i<100 ;i++){ 
      fireEvent.click(screen.queryAllByTestId('cell')[0])
      act(() => {
        jest.advanceTimersByTime(400);
      })
    }
    expect(screen.queryByTestId('winner-container')).toBeInTheDocument();
  })
  
  test("Play Again button starts a new game", () => {
    render(<Game />);
    fireEvent.click(screen.getByText("New game"));
    jest.useFakeTimers();
    for(let i=0; i<100 ;i++){ 
      fireEvent.click(screen.queryAllByTestId('cell')[0])
      act(() => {
        jest.advanceTimersByTime(400);
      })
    }

    expect(screen.queryByText('Play again?')).toBeInTheDocument();
    fireEvent.click(screen.queryByText('Play again?'));
    expect(screen.queryByText('Play again?')).toBe(null);
    expect(screen.queryByTestId('winner-container')).toBe(null);
    expect(screen.queryByTestId('human-gameboard')).toBeInTheDocument();
    expect(screen.queryByTestId('ai-gameboard')).toBeInTheDocument();
  })

})
