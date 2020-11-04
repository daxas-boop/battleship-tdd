import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Game from '../Game';

test('renders correctly', () => {
  const component = renderer.create(<Game />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("New Game onClick renders gameboards", () => {
  render(<Game />);

  expect(screen.getByText("New game")).toBeInTheDocument();

  fireEvent.click(screen.getByText("New game"));
  expect(screen.queryByText("New game")).toBe(null);
  expect(screen.queryByText("Your turn")).toBeInTheDocument();
  expect(screen.queryByText("Your board")).toBeInTheDocument();
  expect(screen.queryByText("Enemy board")).toBeInTheDocument();
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

test("WinnerContainers render when we have winner", () => {

})
